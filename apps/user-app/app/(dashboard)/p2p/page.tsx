import { getServerSession } from "next-auth";
import { P2pTransfer } from "../../components/P2pTransfer";
import { SendCard } from "../../components/SendCard";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";


async function getP2pTransactions() {
    const session = await getServerSession(authOptions);
    const txns = await prisma.p2pTransfer.findMany({
        where: {
            fromUserId: Number(session?.user?.id)
        }
    });
    return txns.map(t => ({
        timestamp: t.timestamp,
        amount: t.amount,
        toUserId : t.toUserId
        
    }))
}


export default async function() {
    const transactions = await getP2pTransactions();
   

    return <div className="w-screen">
        <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
            Transfer
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
            <div>
                <SendCard />
            </div>
            <P2pTransfer  transactions={transactions} />
            </div>
        </div>
    
}