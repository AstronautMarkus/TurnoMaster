import { useState } from "react"
import axios from "axios"

const FIELD_LABELS: Record<string, string> = {
  first_name: "Nombre",
  last_name: "Apellido",
  rut: "RUT",
  rut_dv: "Dígito verificador",
  email: "Correo electrónico",
  company_name: "Nombre de la empresa",
}

const useRegisterDemo = () => {
  const [formData, setFormData] = useState({ first_name: "", last_name: "", rut: "", rut_dv: "", email: "", company_name: "" })
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({})
  const [apiMessage, setApiMessage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [step, setStep] = useState(1)
  const [showSummary, setShowSummary] = useState(false)
  const [success, setSuccess] = useState(false)

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    if (name === "rut") {
      const sanitized = value.replace(/\D/g, "").slice(0, 8)
      setFormData({ ...formData, rut: sanitized })
      return
    }

    if (name === "rut_dv") {
      const sanitized = value.replace(/[^1-9kK]/g, "").slice(0, 1)
      setFormData({ ...formData, rut_dv: sanitized })
      return
    }

    setFormData({ ...formData, [name]: value })
  }

  const nextStep = () => {

    if (step === 1) {
      const requiredFields = {
        first_name: "El nombre es obligatorio.",
        last_name: "El apellido es obligatorio.",
      }
      const newErrors: { [key: string]: string[] } = {}

      for (const field in requiredFields) {
        if (!formData[field as keyof typeof formData]) {
          newErrors[field] = [requiredFields[field as keyof typeof requiredFields]]
        }
      }

      if (!formData.rut || !formData.rut_dv) {
        newErrors.rut = ["Por favor ingrese su RUT y dígito verificador."]
      } else if (formData.rut.length > 8) {
        newErrors.rut = ["El RUT no puede tener más de 8 dígitos."]
      } else if (formData.rut.length < 8) {
        newErrors.rut = ["El RUT no puede tener menos de 8 dígitos."]
      } else if (!/^[1-9kK]{1}$/.test(formData.rut_dv)) {
        newErrors.rut = ["El dígito verificador debe ser un número del 1 al 9 o la letra K."]
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors)
        return
      }
    }
    if (step === 2) {
      const requiredFields = {
        email: "El correo electrónico es obligatorio.",
        company_name: "El nombre de la empresa es obligatorio."
      }
      const newErrors: { [key: string]: string[] } = {}

      for (const field in requiredFields) {
        if (!formData[field as keyof typeof formData]) {
          newErrors[field] = [requiredFields[field as keyof typeof requiredFields]]
        }
      }
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors)
        return
      }
      setShowSummary(true)
      return
    }
    setErrors({})
    setStep((prev) => prev + 1)
  }

  const prevStep = () => {
    if (showSummary) {
      setShowSummary(false)
      return
    }
    setStep((prev) => Math.max(1, prev - 1))
  }

  const editStep = (stepToEdit: number) => {
    setShowSummary(false)
    setStep(stepToEdit)
  }

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    setIsLoading(true)
    setSuccess(false)
    try {
      const response = await axios.post("/api/create/demo-user", formData)
      setErrors({})
      setApiMessage(response.data.message)
      setSuccess(true)
      setShowSummary(true)
    } catch (error: any) {
      setSuccess(false)
      setApiMessage(error.response?.data?.message || "Ha ocurrido un error inesperado. Por favor, inténtelo de nuevo más tarde.")
      if (error.response?.status === 422) {
        const apiErrors = error.response.data.errors || {}

        const translatedErrors: { [key: string]: string[] } = {}
        for (const field in apiErrors) {
          if (Object.prototype.hasOwnProperty.call(apiErrors, field)) {
            const label = FIELD_LABELS[field] || field
            translatedErrors[label] = apiErrors[field] as string[]
          }
        }
        setErrors(translatedErrors)

        const updatedFormData = { ...formData }
        Object.keys(apiErrors).forEach((field) => {
          updatedFormData[field as keyof typeof formData] = ""
        })
        setFormData(updatedFormData)
      } else if (error.response?.status === 400) {
        setErrors({ [FIELD_LABELS.company_name]: [error.response.data.message] })
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
    step,
    nextStep,
    prevStep,
    showSummary,
    editStep,
    success,
  }
}

export default useRegisterDemo
