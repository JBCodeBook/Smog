const InfoCard = ({healthInformation}) => { 

    const backgroundImageStyle = {
        backgroundImage: "url('https://wallpapercave.com/wp/wp6689710.jpg')",
    };

    return (
        <div className="z-30 relative flex items-center justify-center w-full h-full">
            <div className="inset-0 bg-cover bg-center" style={backgroundImageStyle}></div>
            <div className="absolute inset-0 z-20 flex items-center justify-center w-full bg-gray-900 bg-opacity-75" style={{ height: "100%" }}></div>
            <div className="absolute inset-0 z-30 flex flex-col items-center justify-center" style={{ height: "100%" }}>
                <div className="shadow-2xl rounded-lg w-4/5 h-96 bg-cover bg-center" style={backgroundImageStyle}>
                    <div className="grid grid-cols-12 gap-1">
                        <div className="relative my-6 px-8 col-span-12 sm:col-span-12 md:col-span-7 lg:col-span-7 xxl:col-span-7">
                            <div className="border-l-4 border-gray-400 py-20 px-5 mx-2 absolute left-0">
                                <p className="italic text-white text-xl md:text-4xl lg:text-6xl uppercase text-center font-semibold">
                                    HEALTH INFORMATION
                                </p>
                            </div>
                            <div className="text-gray-400 font-semibold text-xl mb-4">07</div>
                            <div className="absolute border-gray-400 border-t-4 bottom-0 py-1 px-4 w-4/5"></div>
                        </div>
                        <div className="col-span-12 sm:col-span-12 md:col-span-5 lg:col-span-5 xxl:col-span-5">
                            <div className="relative bg-pink-900 h-full md:h-96 w-full bg-opacity-50 rounded-tr-lg rounded-br-lg">
                                <div className="p-8">
                                    
                                    <p>
                                        {healthInformation.generalPopulation}
                                    </p>


                                    <div className="bottom-0 absolute p-2 right-0">
                                        <button className="opacity-75 bg-gray-100 hover:bg-pink-900 hover:text-white text-sm font-bold py-2 px-4 rounded inline-flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span>LEARN MORE</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InfoCard;
