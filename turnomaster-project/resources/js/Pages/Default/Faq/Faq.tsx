import React from 'react';

import Faq from '../../../Components/Default/FAQ/Faq';

const FaqPage: React.FC = () => {
    return(
        <div className='min-h-screen'>
            <section className='container mx-auto py-8'>
                <div className='mb-6'>
                    <h1 className='text-2xl font-bold text-center'>Preguntas Frecuentes</h1>
                    <p className='text-center text-gray-600'>Aquí puedes encontrar respuestas a las preguntas más comunes sobre nuestro servicio.</p>
                </div>
                <div className='space-y-4'>
                    <Faq />
                </div>
            </section>
        </div>
    )
};

export default FaqPage;
