import { useState } from "react"
import axios from "axios"

const useRegisterDemo = () => {
  const [formData, setFormData] = useState({ first_name: "", last_name: "", rut: "", rut_dv: "", email: "", company_name: "" })
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({})
  const [apiMessage, setApiMessage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })

    // Clear errors for the `rut` field if `rut_dv` becomes valid
    if ((name === "rut" || name === "rut_dv") && errors.rut) {
      if (isValidDV(name === "rut" ? value : formData.rut, name === "rut_dv" ? value : formData.rut_dv)) {
        const updatedErrors = { ...errors }
        delete updatedErrors.rut
        setErrors(updatedErrors)
      }
    }
  }

  const isValidDV = (rut: string, dv: string): boolean => {
    let sum = 0
    let multiplier = 2

    for (let i = rut.length - 1; i >= 0; i--) {
      sum += parseInt(rut[i], 10) * multiplier
      multiplier = multiplier === 7 ? 2 : multiplier + 1
    }

    const calculatedDV = 11 - (sum % 11)
    if (calculatedDV === 11) return dv.toLowerCase() === "0"
    if (calculatedDV === 10) return dv.toLowerCase() === "k"
    return dv === calculatedDV.toString()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const requiredFields = {
      first_name: "El nombre es obligatorio.",
      last_name: "El apellido es obligatorio.",
      email: "El correo electrónico es obligatorio.",
      company_name: "El nombre de la empresa es obligatorio."
    }
    const newErrors: { [key: string]: string[] } = {}

    for (const field in requiredFields) {
      if (!formData[field as keyof typeof formData]) {
        newErrors[field] = [requiredFields[field as keyof typeof requiredFields]]
      }
    }

    if (!formData.rut || !formData.rut_dv) {
      newErrors.rut = ["Por favor valide su RUT y dígito verificador."]
    } else if (formData.rut.length > 8) {
      newErrors.rut = ["El RUT no puede tener más de 8 dígitos."]
    } else if (formData.rut.length < 8) {
      newErrors.rut = ["El RUT no puede tener menos de 8 dígitos."]
    } else if (!isValidDV(formData.rut, formData.rut_dv)) {
      newErrors.rut = ["El dígito verificador ingresado no es válido."]
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsLoading(true)
    try {
      const response = await axios.post("/api/create/demo-user", formData)
      setErrors({})
      setApiMessage(response.data.message)
      setFormData({ first_name: "", last_name: "", rut: "", rut_dv: "", email: "", company_name: "" })
    } catch (error: any) {
      if (error.response.status === 422) {
        const newErrors = error.response.data.errors || {} // Ensure newErrors is always an object
        setErrors(newErrors)

        const updatedFormData = { ...formData }
        Object.keys(newErrors).forEach((field) => {
          updatedFormData[field as keyof typeof formData] = ""
        })
        setFormData(updatedFormData)
      } else if (error.response.status === 400) {
        setErrors({ company_name: [error.response.data.message] })
      } else {
        setApiMessage("Ha ocurrido un error inesperado. Por favor, inténtelo de nuevo más tarde.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return {
    formData,
    errors,
    apiMessage,
    isLoading,
    isModalOpen,
    toggleModal,
    handleChange,
    handleSubmit,
    isValidDV,
  }
}

export default useRegisterDemo
