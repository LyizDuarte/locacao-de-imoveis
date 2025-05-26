'use client'
import Loading from "@/app/components/loading";
import { apiClient } from "@/utils/apiClient";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";


export default function PagePagamento() {
    const router = useRouter()
    const search = useSearchParams();

    async function confirmarPagamento() {
        let parcela = search.get("parcela");
        if(parcela) {
            const response = apiClient.patch("/aluguel/pagar", {
                id: parcela
            })
            if(response) {
                toast.success("Pagamento confirmado, estamos te redirecionando!");
                setTimeout(function() {
                    router.push("/locatario");
                }, 2000)
            }
        }
        else{
            toast.error("Pagamento não realizado, estamos te redirecionando!");
            setTimeout(function() {
                router.push("/locatario");
            }, 2000)
        }
        //recuperar codigo da query e realizar chamada fetch
    }
    
    useEffect(() => {
        confirmarPagamento();
    })

    return (
        <center>
            <h1>Estamos processando o seu pagamento</h1>
            <Loading></Loading>
        </center>
    )
}