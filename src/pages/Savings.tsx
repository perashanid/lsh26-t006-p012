import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllSavingsPockets, deleteSavingsPocket } from "@/lib/savings-service";
import { formatBDT, calculateDPS } from "@/lib/utils-finance";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Plus, Trash2, Edit, Target, TrendingUp, Calendar } from "lucide-react";
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

const DPS_RATE = 8; // 8% annual rate

const Savings = () => {
  const queryClient = useQueryClient();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data: pockets = [], isLoading } = useQuery({
    queryKey: ["savings"],
    queryFn: getAllSavingsPockets,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteSavingsPocket,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["savings"] });
      toast.success("Savings pocket deleted");
      setDeleteId(null);
    },
    onError: () => {
      toast.error("Failed to delete pocket");
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">Loading savings pockets...</div>
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
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Savings Pockets</h1>
            <p className="text-gray-600">Track your savings goals with DPS comparisons</p>
          </div>
          <Link to="/add-savings">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Pocket
            </Button>
          </Link>
        </div>

        {/* Pockets Grid */}
        {pockets.length === 0 ? (
          <Card>
            <CardContent className="py-16 text-center">
              <Target className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No savings pockets yet
              </h3>
              <p className="text-gray-600 mb-6">
                Create your first savings pocket to start planning for your goals
              </p>
              <Link to="/add-savings">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create First Pocket
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {pockets.map((pocket) => {
              const remaining = pocket.targetAmount - pocket.currentSaved;
              const progressPercentage = (pocket.currentSaved / pocket.targetAmount) * 100;
              const monthsToComplete = Math.ceil(remaining / pocket.monthlyContribution);
              const dpsReturn = calculateDPS(pocket.monthlyContribution, monthsToComplete, DPS_RATE);
              
              // Calculate completion date
              const completionDate = new Date("2026-04-18");
              completionDate.setMonth(completionDate.getMonth() + monthsToComplete);
              const completionStr = completionDate.toLocaleDateString('en-US', {
                month: 'short',
                year: 'numeric'
              });

              return (
                <Card key={pocket.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-1">{pocket.name}</CardTitle>
                        <CardDescription>{pocket.item}</CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Link to={`/edit-savings/${pocket.id}`}>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDeleteId(pocket.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Progress */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-semibold">
                          {formatBDT(pocket.currentSaved)} / {formatBDT(pocket.targetAmount)}
                        </span>
                      </div>
                      <Progress value={progressPercentage} className="h-2" />
                      <p className="text-sm text-gray-600 text-right">
                        {progressPercentage.toFixed(1)}% complete
                      </p>
                    </div>

                    {/* Monthly Contribution */}
                    <div className="flex items-center justify-between py-2 border-t">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Target className="h-4 w-4" />
                        <span className="text-sm">Monthly</span>
                      </div>
                      <span className="font-semibold text-gray-900">
                        {formatBDT(pocket.monthlyContribution)}
                      </span>
                    </div>

                    {/* Expected Completion */}
                    <div className="flex items-center justify-between py-2 border-t">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span className="text-sm">Expected</span>
                      </div>
                      <span className="font-semibold text-gray-900">
                        {monthsToComplete} months ({completionStr})
                      </span>
                    </div>

                    {/* DPS Comparison */}
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-3">
                      <div className="flex items-start gap-2">
                        <TrendingUp className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-green-900 mb-1">
                            DPS Alternative ({DPS_RATE}% annual)
                          </p>
                          <p className="text-xs text-green-700">
                            Investing {formatBDT(pocket.monthlyContribution)}/month in a DPS would yield{" "}
                            <span className="font-semibold">{formatBDT(dpsReturn)}</span> over{" "}
                            {monthsToComplete} months
                          </p>
                          <p className="text-xs text-green-600 mt-1">
                            Extra: {formatBDT(dpsReturn - pocket.targetAmount)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Summary */}
        {pockets.length > 0 && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Targets</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatBDT(pockets.reduce((sum, p) => sum + p.targetAmount, 0))}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Saved</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatBDT(pockets.reduce((sum, p) => sum + p.currentSaved, 0))}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Monthly Commitment</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatBDT(pockets.reduce((sum, p) => sum + p.monthlyContribution, 0))}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <Footer />

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Savings Pocket?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The savings pocket will be permanently removed.
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

export default Savings;
