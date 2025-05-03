import { Card } from "@repo/ui/Card";

export const P2pTransfer = ({
  transactions,
}: {
  transactions: {
    timestamp: Date;
    amount: number;
    // TODO: Can the type of `status` be more specific?

    toUserId: number;
  }[];
}) => {
  if (!transactions.length) {
    return (
      <Card title="Recent Transactions">
        <div className="text-center pb-8 pt-8">No Recent transactions</div>
      </Card>
    );
  }
  return (
    <Card title="Recent Transactions">
      <div>
        {transactions.map((t) => (
          <div className="flex justify-between">
            <div>
              <div className="text-sm">Received INR</div>
              <div className="text-slate-600 text-xs">
                {t.timestamp.toDateString()}
              </div>
              <div className="text-slate-600 text-xs">{t.toUserId}</div>
            </div>
            <div className="flex flex-col justify-center">
              + Rs {t.amount / 100}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
