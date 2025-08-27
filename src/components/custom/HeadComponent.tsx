interface Props {
    title: string;
    description: string;
}
export const HeadComponent = (props: Props) => {
    return (
        <div className="text-center mb-8">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                {props.title}
            </h1>
            <p className="text-gray-600 text-lg">{props.description}</p>
        </div>
    )
}
