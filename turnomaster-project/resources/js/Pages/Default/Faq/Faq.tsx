import { Link } from 'react-router-dom';
import HelmetHelper from '../../../hooks/HelmetHelper/HelmetHelper';
import Faq from '../../../Components/Default/FAQ/Faq';

const FaqPage = () => {
    return(
    <>
        <HelmetHelper path="/faq"/>
        <div className='min-h-screen'>
            <section className='container mx-auto py-10 px-6'>
                <div className='mb-6'>
                    <h1 className='text-4xl font-extrabold text-indigo-700 text-center'>Preguntas Frecuentes</h1>
                    <p className='text-2xl text-center text-gray-600'>Aquí puedes encontrar respuestas a las preguntas más comunes sobre nuestro servicio.</p>
                </div>
                <div className='space-y-4'>
                    <Faq />
                </div>

                <div className='flex flex-col items-center mt-12 space-y-6'>
                    <h1 className='text-4xl font-extrabold text-gray-900 text-center'>¿Tienes alguna otra duda?</h1>
                    <p className='text-lg text-center text-gray-600 max-w-2xl'>
                        No dudes en ponerte en contacto con nosotros. Estamos aquí para ayudarte.
                    </p>
                    <Link to='/contact' className='bg-[#6c5ce7] text-white px-6 py-3 rounded-lg shadow-lg hover:bg-[#5b4acb] transition duration-300 transform hover:scale-105'>
                        Contactar Soporte
                    </Link>
                </div>

            </section>
        </div>
    </>
    )
};

export default FaqPage;
