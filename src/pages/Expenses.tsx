import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllExpenses, deleteExpense } from "@/lib/expense-service";
import { formatBDT } from "@/lib/utils-finance";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Edit, Upload } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const Expenses = () => {
  const queryClient = useQueryClient();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data: expenses = [], isLoading } = useQuery({
    queryKey: ["expenses"],
    queryFn: getAllExpenses,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      toast.success("Expense deleted successfully");
      setDeleteId(null);
    },
    onError: () => {
      toast.error("Failed to delete expense");
    },
  });

  const sortedExpenses = [...expenses].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">Loading expenses...</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Expenses</h1>
            <p className="text-gray-600">Manage your expense records</p>
          </div>
          <div className="flex gap-3">
            <Link to="/add-expense">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Manual
              </Button>
            </Link>
            <Link to="/add-expense-ocr">
              <Button variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Upload Receipt
              </Button>
            </Link>
          </div>
        </div>

        {/* Expenses List */}
        {sortedExpenses.length === 0 ? (
          <Card>
            <CardContent className="py-16 text-center">
              <p className="text-gray-600 mb-4">No expenses yet</p>
              <div className="flex gap-3 justify-center">
                <Link to="/add-expense">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add First Expense
                  </Button>
                </Link>
                <Link to="/add-expense-ocr">
                  <Button variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Receipt
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {sortedExpenses.map((expense) => (
              <Card key={expense.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge variant="secondary">{expense.category}</Badge>
                        <span className="text-sm text-gray-600">{expense.date}</span>
                      </div>
                      <p className="font-semibold text-gray-900 text-lg">{expense.shop}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="text-2xl font-bold text-gray-900">
                        {formatBDT(expense.amount)}
                      </p>
                      <div className="flex gap-2">
                        <Link to={`/edit-expense/${expense.id}`}>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDeleteId(expense.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Summary */}
        {sortedExpenses.length > 0 && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Total Expenses</span>
                <span className="text-2xl font-bold text-gray-900">
                  {formatBDT(sortedExpenses.reduce((sum, exp) => sum + exp.amount, 0))}
                </span>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <Footer />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Expense?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The expense will be permanently removed from your records.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteId && deleteMutation.mutate(deleteId)}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Expenses;
