export default function Loading (){
    return(
        <div className="h-screen relative  inset-0">
            <div className="flex flex-col items-center justify-center h-full">
            <span className="loading loading-ring loading-lg"></span>
            <p>Espera, por favor.</p>
            </div>
        </div>
    )
}
