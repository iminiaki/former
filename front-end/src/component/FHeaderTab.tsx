
export const FHeaderTab = ({value, isActive = false}) => {
    return (
        <div className={`px-4 h-8 flex items-center justify-center ${isActive ? 'border-b-2 border-amber-950' : ''}`}>
            {value}
        </div>
    )
}