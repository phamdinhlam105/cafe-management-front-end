
export default function DefaultAvatar({ name, size }: { name: string, size: number }) {
    const displayName = name
        .split(' ')
        .map(word => word.slice(0, 1).toUpperCase())
        .join('')
        .slice(0, 2);
    return <div className={`h-${size} w-${size} bg-gradient-to-r from-lime-500 via-green-400 to-green-600 rounded-full items-center flex justify-center ${size === 10 ? '' : 'border border-4'} border-white`}>
        <p className={`text-${(size === 10) ? 'sm' : '8xl'} font-bold text-white`}>{displayName}</p>
    </div>
}