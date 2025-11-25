import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { VIETNAMESE_BANKS } from "@/constants/banks";
import { bankCardApi } from "@/lib/apis/bankCardApi";
import { useBankCards } from "@/lib/hooks/useBankCardHooks";
import { SoldOrder } from "@/types/order";
import { formatCurrency } from "@/utils/formatters";
import { calculateWithdrawal } from "@/utils/orderUtils";
import { Wallet, AlertCircle, Plus, CreditCard, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

interface WithdrawDialogProps {
  orders: SoldOrder[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (bankCardId: string, orderIds: string[], note?: string) => void;
  isSubmitting: boolean;
  feePercentage: number;
}

export function WithdrawDialog({ orders, open, onOpenChange, onConfirm, isSubmitting, feePercentage }: WithdrawDialogProps) {
  const { data: bankCardsData, mutate: mutateBankCards } = useBankCards();
  const [selectedBankCardId, setSelectedBankCardId] = useState<string>("");
  const [note, setNote] = useState("");
  const [showAddCard, setShowAddCard] = useState(false);
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [newCard, setNewCard] = useState({
    bankName: "",
    accountNumber: "",
    accountHolder: "",
    isDefault: false,
  });

  useEffect(() => {
    if (bankCardsData?.data && bankCardsData?.data?.length > 0 && !selectedBankCardId) {
      const defaultCard = bankCardsData.data.find((card: any) => card.isDefault);
      setSelectedBankCardId(defaultCard?.id || bankCardsData.data[0].id);
    }
  }, [bankCardsData, selectedBankCardId]);

  // Reset form when closing dialog
  useEffect(() => {
    if (!open) {
      setNote("");
      setShowAddCard(false);
      setNewCard({
        bankName: "",
        accountNumber: "",
        accountHolder: "",
        isDefault: false,
      });
    }
  }, [open]);

  // Add new bank card
  const handleAddCard = async () => {
    const { bankName, accountNumber, accountHolder } = newCard;

    if (!bankName || !accountNumber || !accountHolder) {
      toast.error("Please fill in all bank card information");
      return;
    }

    try {
      setIsAddingCard(true);
      await bankCardApi.createBankCard(newCard);
      toast.success("Bank card added successfully");

      await mutateBankCards();
      setShowAddCard(false);
      setNewCard({ bankName: "", accountNumber: "", accountHolder: "", isDefault: false });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Failed to add bank card";
      toast.error(errorMessage);
    } finally {
      setIsAddingCard(false);
    }
  };

  // Delete bank card
  const handleDeleteCard = async (cardId: string) => {
    try {
      await bankCardApi.deleteBankCard(cardId);
      toast.success("Bank card deleted successfully");
      await mutateBankCards();

      if (selectedBankCardId === cardId) {
        setSelectedBankCardId("");
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Failed to delete bank card";
      toast.error(errorMessage);
    }
  };

  // Confirm withdrawal
  const handleConfirm = () => {
    if (!selectedBankCardId) {
      toast.error("Please select a bank card");
      return;
    }

    const orderIds = orders.map((order) => order.id);
    onConfirm(selectedBankCardId, orderIds, note || undefined);
  };

  if (orders.length === 0) return null;

  const { totalEarnings, fee, finalAmount } = calculateWithdrawal(orders, feePercentage);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Withdraw Funds</DialogTitle>
          <DialogDescription>Withdraw earnings from {orders.length} order(s)</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Earnings Summary */}
          <div className="p-4 bg-muted rounded-md space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Orders selected:</span>
              <span className="text-sm font-semibold">{orders.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Total Earnings:</span>
              <span className="text-base font-semibold">{formatCurrency(totalEarnings)}</span>
            </div>
            <div className="flex justify-between items-center text-red-600 dark:text-red-400">
              <span className="text-sm">Withdrawal Fee ({feePercentage}%):</span>
              <span className="text-base font-semibold">- {formatCurrency(fee)}</span>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Amount to Receive:</span>
              <span className="text-xl font-bold text-green-600">{formatCurrency(finalAmount)}</span>
            </div>
          </div>

          {/* Bank Card Selection */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-base font-semibold">Select Bank Card</Label>
              <Button type="button" variant="outline" size="sm" onClick={() => setShowAddCard(!showAddCard)}>
                <Plus className="h-4 w-4 mr-1" />
                Add New Card
              </Button>
            </div>

            {showAddCard && (
              <div className="p-4 border rounded-md space-y-3 bg-muted/30">
                <div className="space-y-2">
                  <Label htmlFor="bankName">Bank Name</Label>
                  <Select value={newCard.bankName} onValueChange={(value) => setNewCard({ ...newCard, bankName: value })}>
                    <SelectTrigger id="bankName">
                      <SelectValue placeholder="Select a bank" />
                    </SelectTrigger>
                    <SelectContent>
                      {VIETNAMESE_BANKS.map((bank) => (
                        <SelectItem key={bank} value={bank}>
                          {bank}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accountNumber">Account Number</Label>
                  <Input id="accountNumber" placeholder="e.g., 1234567890" value={newCard.accountNumber} onChange={(e) => setNewCard({ ...newCard, accountNumber: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accountHolder">Account Holder</Label>
                  <Input id="accountHolder" placeholder="e.g., NGUYEN VAN A (uppercase)" value={newCard.accountHolder} onChange={(e) => setNewCard({ ...newCard, accountHolder: e.target.value.toUpperCase() })} />
                </div>
                <div className="flex gap-2">
                  <Button type="button" onClick={handleAddCard} disabled={isAddingCard} className="flex-1">
                    {isAddingCard && <Spinner className="mr-2 h-4 w-4" />}
                    Add Card
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setShowAddCard(false)} disabled={isAddingCard}>
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {bankCardsData?.data && bankCardsData?.data?.length > 0 ? (
              <RadioGroup value={selectedBankCardId} onValueChange={setSelectedBankCardId}>
                <div className="space-y-2">
                  {bankCardsData?.data &&
                    bankCardsData.data?.map((card: any) => (
                      <div key={card.id} className="flex items-center justify-between p-3 border rounded-md hover:bg-muted/50">
                        <div className="flex items-center space-x-3 flex-1">
                          <RadioGroupItem value={card.id} id={card.id} />
                          <label htmlFor={card.id} className="flex-1 cursor-pointer">
                            <div className="flex items-center gap-2">
                              <CreditCard className="h-4 w-4 text-muted-foreground" />
                              <span className="font-medium">{card.bankName}</span>
                              {card.isDefault && <span className="text-xs px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded">Default</span>}
                            </div>
                            <div className="text-sm text-muted-foreground mt-1">
                              {card.accountNumber} - {card.accountHolder}
                            </div>
                          </label>
                        </div>
                        <Button type="button" variant="ghost" size="sm" onClick={() => handleDeleteCard(card.id)} className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                </div>
              </RadioGroup>
            ) : (
              <div className="text-center py-6 text-muted-foreground text-sm">No bank cards found. Please add a new card.</div>
            )}
          </div>

          {/* Note Field */}
          <div className="space-y-2">
            <Label htmlFor="note">Note (Optional)</Label>
            <Input id="note" placeholder="e.g., November withdrawal" value={note} onChange={(e) => setNote(e.target.value)} />
          </div>

          {/* Warnings */}
          <div className="p-3 bg-yellow-50 dark:bg-yellow-950 rounded-md border border-yellow-200 dark:border-yellow-800">
            <div className="flex gap-2">
              <AlertCircle className="h-4 w-4 text-yellow-700 dark:text-yellow-300 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-yellow-700 dark:text-yellow-300">A {feePercentage}% system fee will be deducted from your withdrawal amount.</p>
            </div>
          </div>

          <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-md border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              <Wallet className="inline h-4 w-4 mr-1" />
              Your withdrawal request will be reviewed by admin and transferred to your bank account.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} disabled={isSubmitting || !selectedBankCardId}>
            {isSubmitting && <Spinner className="mr-2 h-4 w-4" />}
            Confirm Withdrawal
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
