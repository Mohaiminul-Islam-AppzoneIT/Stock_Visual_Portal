import React from 'react';
import Button from './Button';

const Main = () => {
    return (
       <>
        <div className='container p-5 my-5'>
            <div className='p-5 text-center rounded my-5 bg-light-dark'>
                <h1 className='text-light bg-light-dark'>Stock Visual Portal</h1>
                <p className='text-light lead bg-light-dark'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam sit exercitationem nihil hic quaerat, distinctio id provident dolore. Incidunt corrupti eos id minima facilis saepe magni quaerat reiciendis officia eligendi.</p>
                <Button text='Login' design_classes='btn btn-success mx-3 px-5'/>

            </div>

        </div>
       </>
    );
};

export default Main;