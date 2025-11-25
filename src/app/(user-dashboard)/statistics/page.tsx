"use client";

import { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { withdrawalApi } from '@/lib/apis/withdrawalApi';
import { WithdrawalStatistics } from '@/types/withdrawal';
import { toast } from 'sonner';
import { BarChart3, TrendingUp, Wallet, XCircle, Filter, Calendar, DollarSign } from 'lucide-react';
import { useDiscountRate } from '@/lib/hooks/useDiscountRate';

export default function StatisticsPage() {
     const { discountRate, discountRateNum } = useDiscountRate();
     const [statistics, setStatistics] = useState<WithdrawalStatistics | null>(null);
     const [selectedYear, setSelectedYear] = useState<string>('2025');
     const [selectedMonth, setSelectedMonth] = useState<string>('all');
     const [loading, setLoading] = useState(false);
     const [monthlyData, setMonthlyData] = useState<any[]>([]);

     useEffect(() => {
          fetchStatistics();
          if (selectedMonth === 'all') {
               fetchMonthlyData();
          }
     }, [selectedYear, selectedMonth]);

     const fetchStatistics = async () => {
          try {
               setLoading(true);
               const year = selectedYear !== 'all' ? parseInt(selectedYear) : undefined;
               const month = selectedMonth !== 'all' ? parseInt(selectedMonth) : undefined;
               const response = await withdrawalApi.getStatistics(year, month);
               setStatistics(response.data);
          } catch (error) {
               console.error('Error fetching statistics:', error);
               toast.error('Failed to fetch statistics');
          } finally {
               setLoading(false);
          }
     };

     const fetchMonthlyData = async () => {
          try {
               const year = selectedYear !== 'all' ? parseInt(selectedYear) : new Date().getFullYear();
               const monthlyStats = [];

               for (let month = 1; month <= 12; month++) {
                    const response = await withdrawalApi.getStatistics(year, month);
                    monthlyStats.push({
                         month: new Date(year, month - 1).toLocaleString('en-US', { month: 'short' }),
                         amount: response.data.totalActualAmount,
                         withdrawals: response.data.totalWithdrawals,
                    });
               }
               setMonthlyData(monthlyStats);
          } catch (error) {
               console.error('Error fetching monthly data:', error);
          }
     };

     const formatCurrency = (amount: number) => {
          return new Intl.NumberFormat('vi-VN', {
               style: 'currency',
               currency: 'VND',
          }).format(amount);
     };

     const currentYear = new Date().getFullYear();
     const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

     return (
          <div className="container mx-auto py-6 space-y-6 p-8">
               {/* Header */}
               <div>
                    <h1 className="text-3xl font-bold flex items-center gap-2">
                         <BarChart3 className="h-8 w-8" />
                         Revenue Statistics
                    </h1>
                    <p className="text-muted-foreground mt-1">
                         Track your withdrawal earnings and performance
                    </p>
               </div>

               {/* Filters */}
               <Card>
                    <CardContent className="pt-6">
                         <div className="flex items-center gap-3 flex-wrap">
                              <div className="flex items-center gap-2">
                                   <Filter className="h-4 w-4 text-muted-foreground" />
                                   <span className="text-sm font-medium">Filters:</span>
                              </div>
                              <Select value={selectedYear} onValueChange={setSelectedYear}>
                                   <SelectTrigger className="w-[140px]">
                                        <SelectValue placeholder="Year" />
                                   </SelectTrigger>
                                   <SelectContent>
                                        <SelectItem value="all">All Years</SelectItem>
                                        {years.map(year => (
                                             <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                                        ))}
                                   </SelectContent>
                              </Select>
                              <Select value={selectedMonth} onValueChange={setSelectedMonth} disabled={selectedYear === 'all'}>
                                   <SelectTrigger className="w-[140px]">
                                        <SelectValue placeholder="Month" />
                                   </SelectTrigger>
                                   <SelectContent>
                                        <SelectItem value="all">All Months</SelectItem>
                                        <SelectItem value="1">January</SelectItem>
                                        <SelectItem value="2">February</SelectItem>
                                        <SelectItem value="3">March</SelectItem>
                                        <SelectItem value="4">April</SelectItem>
                                        <SelectItem value="5">May</SelectItem>
                                        <SelectItem value="6">June</SelectItem>
                                        <SelectItem value="7">July</SelectItem>
                                        <SelectItem value="8">August</SelectItem>
                                        <SelectItem value="9">September</SelectItem>
                                        <SelectItem value="10">October</SelectItem>
                                        <SelectItem value="11">November</SelectItem>
                                        <SelectItem value="12">December</SelectItem>
                                   </SelectContent>
                              </Select>
                              <Button variant="outline" size="sm" onClick={fetchStatistics}>
                                   Refresh
                              </Button>
                         </div>
                    </CardContent>
               </Card>

               {/* Statistics Cards */}
               {loading ? (
                    <div className="flex justify-center items-center py-12">
                         <Spinner className="h-8 w-8" />
                    </div>
               ) : statistics ? (
                    <>
                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800">
                                   <CardContent className="p-6">
                                        <div className="flex items-center justify-between">
                                             <div>
                                                  <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Total Withdrawals</p>
                                                  <p className="text-3xl font-bold text-blue-900 dark:text-blue-100 mt-2">
                                                       {statistics.totalWithdrawals}
                                                  </p>
                                             </div>
                                             <TrendingUp className="h-10 w-10 text-blue-500" />
                                        </div>
                                   </CardContent>
                              </Card>

                              <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200 dark:border-green-800">
                                   <CardContent className="p-6">
                                        <div className="flex items-center justify-between">
                                             <div>
                                                  <p className="text-sm font-medium text-green-600 dark:text-green-400">Total Received</p>
                                                  <p className="text-2xl font-bold text-green-900 dark:text-green-100 mt-2">
                                                       {formatCurrency(statistics.totalActualAmount)}
                                                  </p>
                                             </div>
                                             <Wallet className="h-10 w-10 text-green-500" />
                                        </div>
                                   </CardContent>
                              </Card>

                              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border-purple-200 dark:border-purple-800">
                                   <CardContent className="p-6">
                                        <div className="flex items-center justify-between">
                                             <div>
                                                  <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Total Amount</p>
                                                  <p className="text-2xl font-bold text-purple-900 dark:text-purple-100 mt-2">
                                                       {formatCurrency(statistics.totalAmount)}
                                                  </p>
                                             </div>
                                             <DollarSign className="h-10 w-10 text-purple-500" />
                                        </div>
                                   </CardContent>
                              </Card>

                              <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900 border-red-200 dark:border-red-800">
                                   <CardContent className="p-6">
                                        <div className="flex items-center justify-between">
                                             <div>
                                                  <p className="text-sm font-medium text-red-600 dark:text-red-400">Total Fees ({discountRate}%)</p>
                                                  <p className="text-2xl font-bold text-red-900 dark:text-red-100 mt-2">
                                                       {formatCurrency(statistics.totalFee)}
                                                  </p>
                                             </div>
                                             <XCircle className="h-10 w-10 text-red-500" />
                                        </div>
                                   </CardContent>
                              </Card>
                         </div>

                         {/* Monthly Chart */}
                         {selectedMonth === 'all' && monthlyData.length > 0 && (
                              <Card>
                                   <CardHeader>
                                        <CardTitle>Monthly Revenue ({selectedYear})</CardTitle>
                                        <CardDescription>
                                             Withdrawal earnings breakdown by month
                                        </CardDescription>
                                   </CardHeader>
                                   <CardContent>
                                        <ResponsiveContainer width="100%" height={350}>
                                             <BarChart data={monthlyData}>
                                                  <CartesianGrid strokeDasharray="3 3" />
                                                  <XAxis dataKey="month" />
                                                  <YAxis tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`} />
                                                  <Tooltip
                                                       formatter={(value: any) => formatCurrency(value)}
                                                       labelStyle={{ color: '#000' }}
                                                  />
                                                  <Bar dataKey="amount" fill="#10b981" radius={[8, 8, 0, 0]} />
                                             </BarChart>
                                        </ResponsiveContainer>
                                   </CardContent>
                              </Card>
                         )}

                         {/* Period Summary */}
                         <Card>
                              <CardHeader>
                                   <CardTitle className="flex items-center gap-2">
                                        <Calendar className="h-5 w-5" />
                                        Period Summary
                                   </CardTitle>
                              </CardHeader>
                              <CardContent>
                                   <div className="space-y-4">
                                        <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                                             <span className="text-sm font-medium">Period:</span>
                                             <span className="font-semibold">
                                                  {statistics.filters.year === 'all' ? 'All Time' :
                                                       statistics.filters.month === 'all' ? `Year ${statistics.filters.year}` :
                                                            `${new Date(2025, parseInt(statistics.filters.month) - 1).toLocaleString('en-US', { month: 'long' })} ${statistics.filters.year}`
                                                  }
                                             </span>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                             <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                                                  <p className="text-sm text-green-600 dark:text-green-400">Average Per Withdrawal</p>
                                                  <p className="text-xl font-bold text-green-900 dark:text-green-100 mt-1">
                                                       {statistics.totalWithdrawals > 0
                                                            ? formatCurrency(statistics.totalActualAmount / statistics.totalWithdrawals)
                                                            : formatCurrency(0)
                                                       }
                                                  </p>
                                             </div>
                                             <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                                                  <p className="text-sm text-blue-600 dark:text-blue-400">Fee Percentage</p>
                                                  <p className="text-xl font-bold text-blue-900 dark:text-blue-100 mt-1">
                                                       {discountRate}%
                                                  </p>
                                             </div>
                                        </div>
                                   </div>
                              </CardContent>
                         </Card>
                    </>
               ) : null}
          </div>
     );
}
