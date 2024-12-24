const SingleInfo = ({ title, value, isImage, isBalance, isUser }) => {
    return <div className="flex flex-col gap-1">
        <label className={`text-sm font-medium opacity-70  ${isUser ? 'text-white ' : 'text-black '}`}>
            {title}
        </label>
        {isImage ?

            <a rel="noreferrer" title="View image by clicking" href={value} target="_blank"><img className="max-w-[60px] my-2 object-contain max-h-[60px]" alt={title} src={value} /></a>
            : <div className={`text-base py-2  font-semibold px-4 rounded-md ${isUser ? 'bg-primary-darkBlueSupport text-white' : 'bg-pink-100 text-gray-900'}`}>{isBalance && 'Rs.'} {value || 'N/A'}</div>}

    </div>
}
export default SingleInfo