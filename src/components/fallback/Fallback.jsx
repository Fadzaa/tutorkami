import PropTypes from "prop-types";
import { Link } from "react-router-dom"


export default function Fallback({title, body})  {
    return (
        <section className="m-auto container flex h-screen justify-center items-center">
            <div className="card w-full xl:w-8/12 bg-base-200 text-center py-10">
                <p className="text-4xl mt-2 font-bold text-red-600">{title}</p>
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-white-900 sm:text-5xl">{body}</h1>
                <Link to="/"
                      className="mt-10 w-56 m-auto rounded-md bg-cyan-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">Back
                    To Home</Link>
            </div>
        </section>
    )
}

Fallback.propTypes = {
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
}