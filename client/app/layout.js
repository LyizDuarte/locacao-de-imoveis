import "../public/template/css/fontawesome-free/css/all.min.css"
import "../public/template/css/sb-admin-2.min.css"
import { Nunito } from "next/font/google"

const nunito = Nunito({ subsets: ["latin"] })

const metaDados = {
  title: "Locação de Imóveis",
  description: "Aplicação para locação de imóveis",
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className={nunito.className}>
        {children}
        <script src="/template/js/jquery.min.js"></script>
        <script src="/template/js/bootstrap.bundle.min.js"></script>
        <script src="/template/js/sb-admin-2.min.js"></script>
      </body>
    </html>
  )
}
