import React, { useState } from "react";
import {
  Phone,
  CheckCircle,
  User,
  Scissors,
  Shirt,
  FileText,
  ArrowRight,
  Camera,
} from "lucide-react";

interface ReportViewProps {
  onSubmit: (reportData: any) => void;
}

/* ---------------- DATA ---------------- */

const CLOTHING_ITEMS = [
  { id: "tshirt", label: "Polera", icon: "👕" },
  { id: "shirt", label: "Camisa", icon: "👔" },
  { id: "jacket", label: "Casaca", icon: "🧥" },
  { id: "pants", label: "Pantalón", icon: "👖" },
  { id: "dress", label: "Vestido", icon: "👗" },
  { id: "shoes", label: "Zapatillas", icon: "👟" },
];

const COLORS = [
  { id: "black", label: "Negro", hex: "#000000" },
  { id: "white", label: "Blanco", hex: "#FFFFFF" },
  { id: "gray", label: "Gris", hex: "#808080" },
  { id: "blue", label: "Azul", hex: "#2563eb" },
  { id: "red", label: "Rojo", hex: "#dc2626" },
  { id: "green", label: "Verde", hex: "#16a34a" },
];

const HAIR_STYLES = ["Corto", "Largo", "Rapado", "Recogido"];
const HAIR_COLORS = ["Negro", "Castaño", "Rubio", "Rojo", "Canoso"];
const ACCESSORIES = ["Lentes", "Mascarilla", "Mochila", "Audífonos", "Barba"];

/* ---------------- COMPONENT ---------------- */

const ReportView: React.FC<ReportViewProps> = ({ onSubmit }) => {
  const [step, setStep] = useState<1 | 2>(1);

  const [gender, setGender] = useState<string | null>(null);
  const [ageRange, setAgeRange] = useState<string | null>(null);
  const [build, setBuild] = useState<string | null>(null);

  const [hairStyle, setHairStyle] = useState<string | null>(null);
  const [hairColor, setHairColor] = useState<string | null>(null);

  const [selectedClothing, setSelectedClothing] = useState<Record<string, string>>({});
  const [selectedAccessories, setSelectedAccessories] = useState<string[]>([]);
  const [details, setDetails] = useState("");
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  /* ---------------- LOGIC ---------------- */

  const toggleClothing = (id: string) => {
    setSelectedClothing((prev) => {
      const copy = { ...prev };
      if (copy[id]) delete copy[id];
      else copy[id] = "black";
      return copy;
    });
  };

  const setClothingColor = (id: string, color: string) => {
    setSelectedClothing((prev) => ({
      ...prev,
      [id]: color,
    }));
  };

  const toggleAccessory = (item: string) => {
    setSelectedAccessories((prev) =>
      prev.includes(item)
        ? prev.filter((i) => i !== item)
        : [...prev, item]
    );
  };

  const handleSubmit = async () => {
    const reportData = {
      timestamp: new Date().toISOString(),
      gender,
      ageRange,
      build,
      hairStyle,
      hairColor,
      clothing: selectedClothing,
      accessories: selectedAccessories,
      details,
    };

    await onSubmit(reportData);
    setStep(2);
  };

  const callEmergency = () => {
    window.open("tel:105");
  };

  /* ---------------- STEP 1 ---------------- */

  if (step === 1) {
    return (
      <div className="p-6 space-y-4">

        <h2 className="text-xl font-bold">Nuevo Reporte</h2>
        {/* Evidencia */}
<div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200">
  <div className="flex items-center gap-2 mb-3">
    <Camera className="text-teal-600" size={20} />
    <h3 className="font-bold">Evidencia</h3>
  </div>

  <input
    type="file"
    accept="image/*"
    className="w-full"
    onChange={(e) => {
      const file = e.target.files?.[0];
      if (file) {
        setCapturedImage(URL.createObjectURL(file));
      }
    }}
  />

  {capturedImage && (
    <img
      src={capturedImage}
      alt="Evidencia"
      className="mt-4 rounded-xl w-full h-52 object-cover"
    />
  )}
</div>

        {/* Género */}
        <div>
          <p className="font-bold mb-1">Género</p>
          <select
            className="w-full border p-2 rounded"
            value={gender ?? ""}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Seleccionar</option>
            <option value="Hombre">Hombre</option>
            <option value="Mujer">Mujer</option>
            <option value="Otro">Otro</option>
          </select>
        </div>

        {/* Edad */}
        <div>
          <p className="font-bold mb-1">Edad</p>
          <div className="flex gap-2">
            {["Joven", "Adulto", "Mayor"].map((a) => (
              <button
                key={a}
                onClick={() => setAgeRange(a)}
                className={`px-3 py-1 rounded ${
                  ageRange === a ? "bg-teal-600 text-white" : "bg-gray-200"
                }`}
              >
                {a}
              </button>
            ))}
          </div>
        </div>
        {/* Complexión */}
<div>
  <p className="font-bold mb-1">Complexión</p>

  <div className="flex gap-2">
    {["Delgado", "Medio", "Grueso"].map((b) => (
      <button
        key={b}
        onClick={() => setBuild(b)}
        className={`px-3 py-1 rounded ${
          build === b
            ? "bg-teal-600 text-white"
            : "bg-gray-200"
        }`}
      >
        {b}
      </button>
    ))}
  </div>
</div>

{/* Cabello */}
<div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200">

  <div className="flex items-center gap-2 mb-3">
    <Scissors className="text-teal-600" size={20} />
    <h3 className="font-bold">Cabello</h3>
  </div>

  <p className="font-semibold mb-2">Estilo</p>

  <div className="flex flex-wrap gap-2 mb-4">
    {HAIR_STYLES.map((s) => (
      <button
        key={s}
        onClick={() => setHairStyle(s)}
        className={`px-3 py-1 rounded ${
          hairStyle === s
            ? "bg-teal-600 text-white"
            : "bg-gray-200"
        }`}
      >
        {s}
      </button>
    ))}
  </div>

  <p className="font-semibold mb-2">Color</p>

  <div className="flex flex-wrap gap-2">
    {HAIR_COLORS.map((c) => (
      <button
        key={c}
        onClick={() => setHairColor(c)}
        className={`px-3 py-1 rounded ${
          hairColor === c
            ? "bg-teal-600 text-white"
            : "bg-gray-200"
        }`}
      >
        {c}
      </button>
    ))}
  </div>
</div>

{/* Vestimenta */}
<div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200">

  <div className="flex items-center gap-2 mb-3">
    <Shirt className="text-teal-600" size={20} />
    <h3 className="font-bold">Vestimenta</h3>
  </div>

  <div className="space-y-4">
    {CLOTHING_ITEMS.map((item) => (
      <div key={item.id}>

        <button
          onClick={() => toggleClothing(item.id)}
          className={`w-full flex justify-between items-center p-3 rounded-xl ${
            selectedClothing[item.id]
              ? "bg-teal-100 border border-teal-400"
              : "bg-gray-100"
          }`}
        >
          <span>
            {item.icon} {item.label}
          </span>

          {selectedClothing[item.id] && (
            <span className="text-sm text-teal-700 font-bold">
              Seleccionado
            </span>
          )}
        </button>

        {selectedClothing[item.id] && (
          <div className="flex gap-2 mt-2 flex-wrap">
            {COLORS.map((c) => (
              <button
                key={c.id}
                onClick={() =>
                  setClothingColor(item.id, c.id)
                }
                className={`w-8 h-8 rounded-full border-2 ${
                  selectedClothing[item.id] === c.id
                    ? "ring-2 ring-teal-500"
                    : ""
                }`}
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>
        )}
      </div>
    ))}
  </div>
</div>

        {/* Accesorios */}
        <div>
          <p className="font-bold mb-1">Accesorios</p>
          <div className="flex flex-wrap gap-2">
            {ACCESSORIES.map((a) => (
              <button
                key={a}
                onClick={() => toggleAccessory(a)}
                className={`px-2 py-1 rounded ${
                  selectedAccessories.includes(a)
                    ? "bg-teal-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                {a}
              </button>
            ))}
          </div>
        </div>

        {/* Detalles */}
        <textarea
          className="w-full border p-2 rounded"
          placeholder="Detalles adicionales..."
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-teal-600 text-white p-4 rounded-xl"
        >
        <div className="flex items-center justify-center gap-2">
  Enviar Reporte
  <ArrowRight size={18} />
</div>
        </button>
      </div>
    );
  }

  /* ---------------- STEP 2 ---------------- */

  return (
    <div className="text-center p-6">

      <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <CheckCircle className="text-teal-600 w-10 h-10" />
      </div>

      <h2 className="text-2xl font-bold mb-2">¡Reporte Enviado!</h2>

      <p className="text-gray-600 mb-6">
        Tu reporte fue registrado correctamente.
      </p>

      <button
        onClick={callEmergency}
        className="w-full bg-red-600 text-white p-4 rounded-xl flex items-center justify-center gap-2"
      >
        <Phone /> Llamar a emergencias
      </button>
    </div>
  );
};

export default ReportView;