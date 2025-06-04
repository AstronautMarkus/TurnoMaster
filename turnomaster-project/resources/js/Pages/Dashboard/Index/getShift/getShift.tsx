import { useState, useEffect } from 'react';
import { getNextShift, Shift, checkAttendanceToday } from './useGetShift';
import { Link } from 'react-router-dom';

const AttendanceWidget = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [nextShift, setNextShift] = useState<Shift | null>(null);
    const [shiftError, setShiftError] = useState<string | null>(null);
    const [shiftLoading, setShiftLoading] = useState<boolean>(true);

    const [attendanceChecked, setAttendanceChecked] = useState<boolean>(false);
    const [attendanceRegistered, setAttendanceRegistered] = useState<boolean>(false);
    const [attendanceLoading, setAttendanceLoading] = useState<boolean>(false);
    const [attendanceMsg, setAttendanceMsg] = useState<string | null>(null);


    const [canRegister, setCanRegister] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        setShiftLoading(true);
        getNextShift()
            .then((shift) => {
                setNextShift(shift);
                setShiftError(null);
                setShiftLoading(false);
            })
            .catch((error) => {
                if (error.response && error.response.status === 404 && error.response.data?.error) {
                    setShiftError(error.response.data.error);
                } else {
                    setShiftError('No hay horarios asignados');
                }
                setNextShift(null);
                setShiftLoading(false);
            });
    }, []);

    useEffect(() => {
        if (!nextShift) return;
        setAttendanceLoading(true);
        checkAttendanceToday()
            .then((attended) => {
                setAttendanceRegistered(attended);
                setAttendanceChecked(true);
                setAttendanceLoading(false);
            })
            .catch(() => {
                setAttendanceRegistered(false);
                setAttendanceChecked(true);
                setAttendanceLoading(false);
            });
    }, [nextShift]);

    useEffect(() => {
        if (!nextShift) return setCanRegister(false);
        const interval = setInterval(() => {
            const now = new Date();
            const [startHour, startMinute] = nextShift.start_time.split(':').map(Number);
            const shiftStart = new Date(now);
            shiftStart.setHours(startHour, startMinute, 0, 0); // HH:MM:00
            setCanRegister(now >= shiftStart);
        }, 1000);
        return () => clearInterval(interval);
    }, [nextShift, currentTime]);

    
    const getHelperText = () => {
        if (attendanceRegistered) return null;
        if (!nextShift) return null;
        const now = currentTime;
        const [startHour, startMinute] = nextShift.start_time.split(':').map(Number);
        const shiftStart = new Date(now);
        shiftStart.setHours(startHour, startMinute, 0, 0); // HH:MM:00

        if (now < shiftStart) {
            const diffMs = shiftStart.getTime() - now.getTime();
            const diffMin = Math.floor(diffMs / 60000);
            const diffSec = Math.floor((diffMs % 60000) / 1000);

            if (diffMin > 5) return "Aún falta para tu horario de entrada.";
            if (diffMin > 1) return "Ya falta poco para poder registrar tu asistencia.";
            if (diffMin === 1) return "¡Un minuto más y podrás registrar tu asistencia!";
            if (diffMin === 0 && diffSec > 10) return "¡Ya casi! Espera unos segundos más...";
            if (diffMin === 0 && diffSec <= 10) return "¡Prepárate! El botón se habilitará en breve.";
        }
        return null;
    };

    const canRegisterAttendance = (() => {
        if (!nextShift || attendanceRegistered) return false;
        const now = currentTime;
        const [startHour, startMinute] = nextShift.start_time.split(':').map(Number);
        const shiftStart = new Date(now);
        shiftStart.setHours(startHour, startMinute, 0, 0); // HH:MM:00
        return now >= shiftStart;
    })();

    return (
        <div className="bg-white shadow-lg sm:p-6 flex flex-col min-w-[300px] max-w-xs mx-auto mt-4 lg:mt-0">
            <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">Hora actual:</h3>
                <p className="text-lg text-gray-700 text-center">{currentTime.toLocaleTimeString()}</p>
            </div>
            <div className="pt-4 border-t border-gray-300">
                <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">Próximo horario de entrada:</h3>
                <p className="text-lg text-gray-700 text-center">
                    {shiftLoading
                        ? 'Cargando...'
                        : nextShift
                            ? nextShift.start_time
                            : shiftError || 'No hay horarios asignados'}
                </p>
                {attendanceChecked && nextShift && !shiftLoading && (
                    <div className="mt-4 flex flex-col items-center">
                        <Link
                            to="/dashboard/reports/turnos/register"
                            className={`px-4 py-2 dashboard-button-success text-white font-bold disabled:bg-gray-400 ${(!canRegister || attendanceLoading || attendanceRegistered) ? 'pointer-events-none opacity-60' : ''}`}
                            tabIndex={(!canRegister || attendanceLoading || attendanceRegistered) ? -1 : 0}
                            aria-disabled={!canRegister || attendanceLoading || attendanceRegistered}
                        >
                            {attendanceLoading
                                ? 'Registrando...'
                                : attendanceRegistered
                                    ? 'Asistencia registrada'
                                    : 'Registrar asistencia'}
                        </Link>
                        {attendanceMsg && (
                            <p className="mt-2 text-sm text-green-600">{attendanceMsg}</p>
                        )}
                        {!canRegister && !attendanceRegistered && (
                            <>
                                {getHelperText() && (
                                    <p className="mt-1 text-xs font-bold mb-2 mt-2 text-gray-500">{getHelperText()}</p>
                                )}
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AttendanceWidget;
