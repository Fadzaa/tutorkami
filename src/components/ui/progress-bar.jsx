export function ProgressBar({ completed, total }) {
    const percentage = Math.round((completed / total) * 100);

    return (
        <div className={`flex justify-center`}>
            <div className="w-5/6 bg-gray-200 rounded-full h-2.5">
                <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${percentage}%` }}
                ></div>
                <div className={`flex justify-between pt-0.5 px-1`}>
                    <p className={`text-sm font-medium text-black`}>{percentage}% Complete</p>
                    <p className={`text-sm font-medium text-[#ABABAB]`}>{completed}/{total}</p>
                </div>
            </div>
        </div>
    );
}