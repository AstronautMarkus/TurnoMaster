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

    const canRegisterAttendance = (() => {
        if (!nextShift || attendanceRegistered) return false;
        const now = currentTime;
        const [startHour, startMinute] = nextShift.start_time.split(':').map(Number);
        const shiftStart = new Date(now);
        shiftStart.setHours(startHour, startMinute, 0, 0);
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
                        <button
                            className={`px-4 py-2 dashboard-button-success text-white font-bold disabled:bg-gray-400`}
                            disabled={!canRegisterAttendance || attendanceLoading}
                        >
                            {attendanceLoading
                                ? 'Registrando...'
                                : attendanceRegistered
                                    ? 'Asistencia registrada'
                                    : 'Registrar asistencia'}
                        </button>
                        {attendanceMsg && (
                            <p className="mt-2 text-sm text-green-600">{attendanceMsg}</p>
                        )}
                        {!canRegisterAttendance && !attendanceRegistered && (
                            <p className="mt-2 text-xs text-red-500">
                                Solo puedes registrar asistencia a partir de la hora de entrada.
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AttendanceWidget;
