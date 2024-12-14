import React from 'react';
import spinner from "../assets/Loader/spinner.svg";


const Loader = () => {
    return (
        <section className='flex flex-col items-center min-h-screen '>
            

            <img src={spinner} alt="" width={150}/>
        </section>
    );
};

export default Loader;