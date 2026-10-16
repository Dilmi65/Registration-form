import { useState } from 'react'
import { useNavigate } from "react-router-dom";



const labelClass = 'mb-1.5 block text-sm font-medium text-slate-700'
const inputClass =
    'w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 ' +
    'placeholder:text-slate-400 shadow-sm transition ' +
    'focus:border-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-600/15'



function Register() {

    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [dob, setDob] = useState('')
    const [gender, setGender] = useState('')
    const [email, setEmail] = useState('')
    const [nic, setNic] = useState('')
    const [password, setPassword] = useState('')

    const API = import.meta.env.VITE_API_BASE_URL; // component eka ihalin

    const [phone, setPhone] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState("");



    const handleSubmit = async () => {
        const newErrors = {
            firstName: validateFirstname(firstName),
            lastName: validateLastname(lastName),   // last name ekatath ekama rule eka
            email: validatemail(email),
            nic: validateNIC(nic, dob, gender),
            dob: validateDob(dob),
            gender: "",     // gender validation liyapu passe danna
            password: validatepassword(password),
            confirmPassword: validateConfirmPassword(confirmPassword, password),
            phone: validatePhone(phone)

        };
        setErrors(newErrors);
        // Error ekak hari thiyenawa nam stop
        const hasError = Object.values(newErrors).some((msg) => msg !== "");
        if (hasError) {
            return;
        }

        setApiError("");
        setLoading(true);

        try {
            const res = await fetch(`${API}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    name: firstName + " " + lastName,
                    email: email,
                    dob: dob,
                    phone: phone,
                    nic: nic,
                    password: password,
                    password_confirmation: confirmPassword,
                    username: firstName
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                // 422 wage: "The email has already been taken." wage message eka
                setApiError(data.message || "Registration failed");
                return;
            }

            localStorage.setItem("token", data.token);
            navigate("/");
        } catch (err) {
            console.log("Register error:", err);
            setApiError("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    };


    //errors show karanna space ekak hadanawa meken 
    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        dob: "",
        gender: "",
        email: "",
        nic: "",
        password: "",
        phone: "",
        confirmPassword: ""

    })


    const validateFirstname = (value: string) => {
        if (value.trim() === "") {
            return "First name is empty";
        } else if (!/^[A-Za-z]+$/.test(value)) {
            return "First name should contain only letters";
        } return "";
    }

    const validateLastname = (value: string) => {
        if (value.trim() === "") {
            return "Last name is empty";
        } else if (!/^[A-Za-z]+$/.test(value)) {
            return "Last name should contain only letters";
        } return "";
    }

    const validateDob = (value: string) => {
        if (value === "") {
            return "Date of birth is required";
        }

        const birth = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // welawa ain karala dawasa witharai ganna

        // Rule 1: past date ekak wenna ona
        if (birth >= today) {
            return "Date of birth must be a past date";
        }

        // Rule 2: age eka 100 ta wadi nowenna ona
        const hundredYearsAgo = new Date(today);
        hundredYearsAgo.setFullYear(today.getFullYear() - 100);
        if (birth < hundredYearsAgo) {
            return "Age cannot be more than 100 years";
        }

        return "";
    };
    const validatemail = (value: string) => {

        if (value.trimEnd() === "") {
            return "Email is empty";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            return "Invalid email format";
        }
        return "";
    }

    const validatePhone = (value: string) => {
        if (value.trim() === "") {
            return "Phone number is empty";

        }
        return "";
    }


    const validateNIC = (nic: string, dob: string, gender: string) => {
        if (nic.trim() === "") {
            return "NIC is required";
        }

        let nicYear = 0;
        let dayPart = 0;

        // 1. Format eka balanna, year saha day part eka ganna
        if (/^\d{9}[VvXx]$/.test(nic)) {
            nicYear = 1900 + Number(nic.substring(0, 2));
            dayPart = Number(nic.substring(2, 5));
        } else if (/^\d{12}$/.test(nic)) {
            nicYear = Number(nic.substring(0, 4));
            dayPart = Number(nic.substring(4, 7));
        } else {
            return "Invalid NIC format (9 digits + V, or 12 digits)";
        }

        // 2. Gender eka hoyanna
        let nicGender = "Male";
        let nicDay = dayPart;
        if (dayPart > 500) {
            nicGender = "Female";
            nicDay = dayPart - 500;
        }

        if (nicDay < 1 || nicDay > 366) {
            return "Invalid NIC: wrong birth day number";
        }

        // 3. DOB eka form eken ganna
        if (dob === "" || gender === "") {
            return "Enter date of birth and gender first";
        }

        const [y, m, d] = dob.split("-").map(Number);
        const monthDays = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // Feb = 29 hama welawema
        let dobDay = d;
        for (let i = 0; i < m - 1; i++) {
            dobDay += monthDays[i];
        }

        // 4. Match karala balanna
        if (nicYear !== y || nicDay !== dobDay) {
            return "NIC does not match the date of birth";
        }
        if (nicGender !== gender) {
            return "NIC does not match the gender";
        }

        return "";
    };

    const validatepassword = (value: string) => {
        if (value.trim() === "") {
            return "Password is empty";
        } else if (value.length < 8) {
            return "Password must be at least 8 characters long";
        }
        return "";
    }

    const validateConfirmPassword = (value: string, pw: string) => {
        if (value === "") return "Please confirm your password";
        if (value !== pw) return "Passwords do not match";
        return "";
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
            <div className="w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-slate-200">
                {/* Header */}
                <div className="border-b border-slate-200 bg-slate-50 px-8 py-6">
                    <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
                        Create your account
                    </h1>
                    <p className="mt-1 text-sm text-slate-500">
                        Fill in your details to register.
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-6 px-8 py-8">

                    {/* First name + Last name */}
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div>
                            <label htmlFor="firstName" className={labelClass}>
                                First name
                            </label>
                            <input
                                id="firstName"
                                type="text"
                                placeholder="Dilmi"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                onBlur={() => { setErrors({ ...errors, firstName: validateFirstname(firstName) }) }}
                                className={inputClass}
                            />

                            {errors.firstName && (
                                <p className="mt-1.5 text-xs text-red-500">
                                    {errors.firstName}
                                </p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="lastName" className={labelClass}>
                                Last name
                            </label>
                            <input
                                id="lastName"
                                type="text"
                                placeholder="Edirisingha"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                onBlur={() => { setErrors({ ...errors, lastName: validateLastname(lastName) }) }}
                                className={inputClass}
                            />

                            {errors.lastName && (
                                <p className="mt-1.5 text-xs text-red-500">
                                    {errors.lastName}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* DOB + Gender */}
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div>
                            <label htmlFor="dob" className={labelClass}>
                                Date of birth
                            </label>
                            <input
                                id="dob"
                                type="date"
                                value={dob}
                                onChange={(e) => setDob(e.target.value)}
                                onBlur={() => { setErrors({ ...errors, dob: validateDob(dob) }) }}
                                className={inputClass}
                            />

                            {errors.dob && (<p className="mt-1.5 text-xs text-red-500">
                                {errors.dob}
                            </p>)}
                        </div>

                        {/* Gender */}
                        <div>
                            <label htmlFor="gender" className={labelClass}>
                                Gender
                            </label>
                            <select
                                id="gender"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                onBlur={() => { setErrors({ ...errors, gender: gender === "" ? "Gender is required" : "" }) }}
                                className={inputClass}
                            >
                                <option value="">Select gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                            {errors.gender && (
                                <p className="mt-1.5 text-xs text-red-500">
                                    {errors.gender}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className={labelClass}>
                            Email address
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onBlur={() => { setErrors({ ...errors, email: validatemail(email) }) }}
                            className={inputClass}
                        />

                        {errors.email && (<p className="mt-1.5 text-xs text-red-500">
                            {errors.email}
                        </p>)}
                    </div>

                    {/* NIC */}
                    <div>
                        <label htmlFor="nic" className={labelClass}>
                            NIC number
                        </label>
                        <input
                            id="nic"
                            type="text"
                            placeholder="199012345678 or 901234567V"
                            value={nic}
                            onChange={(e) => setNic(e.target.value)}
                            onBlur={() => { setErrors({ ...errors, nic: validateNIC(nic, dob, gender) }) }}
                            className={inputClass}
                        />
                        {errors.nic && (<p className="mt-1.5 text-xs text-red-500">
                            {errors.nic}
                        </p>)}

                        <p className="mt-1.5 text-xs text-slate-500">
                            Enter the 12-digit number, or the 9-digit number with V or X.
                        </p>
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password" className={labelClass}>
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onBlur={() => { setErrors({ ...errors, password: validatepassword(password) }) }}
                            className={inputClass}
                        />
                        {errors.password && (<p className="mt-1.5 text-xs text-red-500">
                            {errors.password}
                        </p>)}
                    </div>


                    {/* Confirm password */}
                    <div>
                        <label htmlFor="confirmPassword" className={labelClass}>Confirm password</label>
                        <input
                            id="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className={inputClass}
                            onBlur={() => setErrors({ ...errors, confirmPassword: validateConfirmPassword(confirmPassword, password) })}
                        />
                        {errors.confirmPassword && <p className="mt-1.5 text-xs text-red-500">{errors.confirmPassword}</p>}
                    </div>


                    {/* Phone */}
                    <div>
                        <label htmlFor="phone" className={labelClass}>Phone</label>
                        <input
                            id="phone"
                            type="text"
                            placeholder="+94771234567"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className={inputClass}
                            onBlur={() => setErrors({ ...errors, phone: validatePhone(phone) })}
                        />
                        {errors.phone && <p className="mt-1.5 text-xs text-red-500">{errors.phone}</p>}
                    </div>

                    {/* Register button */}

                    {apiError && (
                        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{apiError}</p>
                    )}
                    <button
                        disabled={loading}
                        type="submit"
                        className="w-full rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-600/30 active:bg-indigo-800"
                    >
                        {loading ? "Please wait..." : "Register"}
                    </button>

                    <p className="text-center text-sm text-slate-500 py-5">
                        Already have an account?{' '}
                        <a href="/" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Sign in
                        </a>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Register