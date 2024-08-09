import React from "react";

function LikesHoverBarForm({formik}) {

    return (
        <form onSubmit={formik.handleSubmit}>
                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] p-2 shadow">
                <div className="join">
                    <button className="btn btn-ghost join-item" name="heart_color" value="pink" onClick={() => formik.setFieldValue("heart_color","pink")} type="submit">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="pink"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    </button>
                    <button className="btn btn-ghost join-item" name="heart_color" value="red" onClick={() => formik.setFieldValue("heart_color","red")} type="submit">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="red"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    </button>
                    <button className="btn btn-ghost join-item" name="heart_color" value="orange" onClick={() => formik.setFieldValue("heart_color","orange")} type="submit">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="orange"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    </button>
                    <button className="btn btn-ghost join-item" name="heart_color" value="yellow" onClick={() => formik.setFieldValue("heart_color","yellow")} type="submit">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="yellow"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    </button>
                    <button className="btn btn-ghost join-item" name="heart_color" value="green" onClick={() => formik.setFieldValue("heart_color","green")} type="submit">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="green"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    </button>
                    <button className="btn btn-ghost join-item" name="heart_color" value="blue" onClick={() => formik.setFieldValue("heart_color","blue")} type="submit">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="blue"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    </button>
                    <button className="btn btn-ghost join-item" name="heart_color" value="purple" onClick={() => formik.setFieldValue("heart_color","purple")} type="submit">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="purple"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    </button>
                    </div>
                    </ul>
                    </form>
    )
}

export default LikesHoverBarForm;