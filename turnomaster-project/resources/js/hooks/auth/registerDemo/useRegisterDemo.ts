import { useState } from "react"
import axios from "axios"

const useRegisterDemo = () => {
  const [formData, setFormData] = useState({ name: "", email: "", company_name: "" })
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
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await axios.post("/api/create-demo-user", formData)
      setErrors({})
      setApiMessage(response.data.message)
      setFormData({ name: "", email: "", company_name: "" })
    } catch (error: any) {
      if (error.response.status === 422) {
        const newErrors = error.response.data.errors
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
  }
}

export default useRegisterDemo
