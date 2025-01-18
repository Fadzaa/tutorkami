export default function ProgressCircle({ width, height, progress, textProgress, text }) {
    const circumference = 2 * Math.PI * 40;

    return (
        <div className="flex items-center justify-center h-full">
            <div className={`relative ${width} ${height}`}>
                <svg className="absolute top-0 left-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#e5e7eb" strokeWidth="8"/>
                    <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                        stroke="url(#progress-gradient)"
                        strokeWidth="8"
                        strokeDasharray={circumference}
                        strokeDashoffset={circumference * (1 - progress / 100)}
                    />
                    <defs>
                        <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#000000"/>
                            <stop offset="100%" stopColor="#000000"/>
                        </linearGradient>
                    </defs>
                </svg>
                <div
                    className={`${text} absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold text-gray-900 dark:text-gray-50`}>
                    {textProgress}
                </div>
            </div>
        </div>
    );
}