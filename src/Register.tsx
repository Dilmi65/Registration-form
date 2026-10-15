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

    // The button doesn't need to work yet, so we only stop the page from reloading
    const handleSubmit = () => {
        localStorage.setItem("user", JSON.stringify({ name: firstName + " " + lastName, email: email }));
        navigate("/Home");
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
                                className={inputClass}
                            />
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
                                className={inputClass}
                            />
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
                                className={inputClass}
                            />
                        </div>

                        <div>
                            <label htmlFor="gender" className={labelClass}>
                                Gender
                            </label>
                            <select
                                id="gender"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                className={inputClass}
                            >
                                <option value="">Select gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
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
                            className={inputClass}
                        />
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
                            className={inputClass}
                        />
                        <p className="mt-1.5 text-xs text-slate-500">
                            Enter the 12-digit number, or the 9-digit number with V or X.
                        </p>
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