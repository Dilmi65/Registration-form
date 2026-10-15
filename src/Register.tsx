import { error } from 'console';
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

    const handleSubmit = () => {
        localStorage.setItem("user", JSON.stringify({ name: firstName + " " + lastName, email: email }));
        navigate("/Home");
    }

    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        dob: "",
        gender: "",
        email: "",
        nic: "",
        password: ""
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
        if (value.trim() === "") {
            return "Date of birth is empty";
        } else if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
            return "Invalid date format. Please use YYYY-MM-DD.";
        } return "";
    }

    const validatemail = (value: string) => {

        if (value.trimEnd() === "") {
            return "Email is empty";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            return "Invalid email format";
        }
        return "";
    }

    const validateNIC = (value: string) => {
        if (value.trim() === "") {
            return "NIC is empty";
        } else if (!/^\d{12}$/.test(value) && !/^\d{9}[VX]$/.test(value)) {
            return "Invalid NIC format. Please enter a 12-digit number or a 9-digit number followed by 'V' or 'X'.";
        } return "";
    }

    const validatepassword = (value: string) => {
        if (value.trim() === "") {
            return "Password is empty";
        } else if (value.length < 8) {
            return "Password must be at least 8 characters long";
        }
        return "";
    }


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
                <form onSubmit={handleSubmit} className="space-y-6 px-8 py-8">

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
                            onBlur={() => { setErrors({ ...errors, nic: validateNIC(nic) }) }}
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

                    {/* Register button */}
                    <button onClick={handleSubmit}
                        type="submit"
                        className="w-full rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-600/30 active:bg-indigo-800"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Register