import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import MovieForm from "../components/MovieForm";
import PageHeader from "../components/PageHeader";

const initialForm = {
  nome: "",
  genero: "",
  ano: "",
};

function CreateMovie() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");

    try {
      await api.post("/", form);
      navigate("/");
    } catch (err) {
      setError("Nao foi possivel criar o filme.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="page">
      <PageHeader title="Criar Filme" />

      <MovieForm
        value={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={() => navigate("/")}
        submitLabel="Criar"
        isSubmitting={saving}
        error={error}
      />
    </section>
  );
}

export default CreateMovie;
