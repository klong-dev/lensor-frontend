import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { OrderStatusBadge } from "@/components/ui/status-badges";
import { SoldOrder } from "@/types/order";
import { Withdrawal } from "@/types/withdrawal";
import { formatCurrency, formatDate } from "@/utils/formatters";
import { getTimeUntilWithdrawable } from "@/utils/orderUtils";
import { CheckCircle, AlertTriangle, MoreVertical, Wallet, Eye, CalendarClock, Clock, XCircle } from "lucide-react";

interface OrdersTableProps {
  orders: SoldOrder[];
  withdrawals: Withdrawal[];
  onViewDetails: (order: SoldOrder) => void;
  onWithdraw: (order: SoldOrder) => void;
  selectedOrders?: string[];
  onOrderSelect?: (orderId: string, checked: boolean) => void;
  showCheckboxes?: boolean;
}

export function OrdersTable({ orders, withdrawals, onViewDetails, onWithdraw, selectedOrders = [], onOrderSelect, showCheckboxes = false }: OrdersTableProps) {
  // Check if order is already withdrawn
  const isOrderWithdrawn = (orderId: string) => {
    return withdrawals.some((w) => w.orderIds.includes(orderId) && (w.status === "approved" || w.status === "pending"));
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            {showCheckboxes && <TableHead className="w-12"></TableHead>}
            <TableHead>Order ID</TableHead>
            <TableHead>Products</TableHead>
            <TableHead>Earnings</TableHead>
            <TableHead>Withdrawal Status</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => {
            const isWithdrawable = order.canWithdraw && order.status !== "withdrawing";
            const isSelected = selectedOrders.includes(order.id);

            return (
              <TableRow key={order.id}>
                {showCheckboxes && <TableCell>{isWithdrawable && <Checkbox checked={isSelected} onCheckedChange={(checked) => onOrderSelect?.(order.id, checked as boolean)} />}</TableCell>}
                <TableCell className="font-mono text-xs">{order.id.substring(0, 8)}...</TableCell>
                <TableCell>
                  <div className="max-w-[200px]">
                    {order.sellerItems.map((item, idx) => (
                      <div key={idx} className="text-sm truncate">
                        {item.productTitle} ({item.quantity}x)
                      </div>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="font-semibold">{formatCurrency(order.sellerEarnings)}</TableCell>
                <TableCell>
                  {order.status === "withdrawn" ? (
                    <Badge className="bg-blue-500 hover:bg-blue-600 text-white">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Withdrawn
                    </Badge>
                  ) : order.status === "withdrawing" ? (
                    <Badge className="bg-yellow-500 hover:bg-yellow-600 text-white">
                      <Clock className="h-3 w-3 mr-1" />
                      Withdrawing
                    </Badge>
                  ) : isOrderWithdrawn(order.id) ? (
                    <Badge className="bg-blue-500 hover:bg-blue-600 text-white">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Withdrawn
                    </Badge>
                  ) : order.status === "reported" ? (
                    <Badge className="bg-red-500 hover:bg-red-600 text-white">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      Cannot Withdraw
                    </Badge>
                  ) : order.status === "refunded" ? (
                    <Badge className="bg-gray-500 hover:bg-gray-600 text-white">
                      <XCircle className="h-3 w-3 mr-1" />
                      Refunded
                    </Badge>
                  ) : order.canWithdraw ? (
                    <Badge className="bg-green-500 hover:bg-green-600 text-white">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Available Now
                    </Badge>
                  ) : (
                    <div className="flex items-center gap-1.5 text-sm">
                      <CalendarClock className="h-4 w-4 text-amber-500" />
                      <span className="text-muted-foreground">Available in {getTimeUntilWithdrawable(order.withdrawableAt)}</span>
                    </div>
                  )}
                </TableCell>
                <TableCell className="text-sm">{formatDate(order.createdAt)}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onViewDetails(order)} className="cursor-pointer">
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      {isWithdrawable && order.status !== "withdrawn" && order.status !== "withdrawing" && !isOrderWithdrawn(order.id) && (
                        <DropdownMenuItem onClick={() => onWithdraw(order)} className="cursor-pointer text-green-600">
                          <Wallet className="mr-2 h-4 w-4" />
                          Withdraw Funds
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
