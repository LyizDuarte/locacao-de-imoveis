import FormImovel from "@/app/components/formImovel";

export default function CadastrarImovel() {
  return (
    <div>
      <h1>Cadastrar imóvel</h1>
      <div>
        {
          // adicionar o formulario
          <FormImovel></FormImovel>
        }
      </div>
    </div>
  )
}
