import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getSalarySettings, updateSalarySettings } from "@/lib/salary-service";
import { formatBDT } from "@/lib/utils-finance";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import { DollarSign, Calendar } from "lucide-react";

const Settings = () => {
  const queryClient = useQueryClient();

  const { data: salary, isLoading } = useQuery({
    queryKey: ["salary"],
    queryFn: getSalarySettings,
  });

  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (salary) {
      setAmount(salary.monthlyAmount.toString());
    }
  }, [salary]);

  const updateMutation = useMutation({
    mutationFn: (newAmount: number) => updateSalarySettings(newAmount),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["salary"] });
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      toast.success("Salary updated successfully");
    },
    onError: () => {
      toast.error("Failed to update salary");
    },
  });

  const validate = (): boolean => {
    if (!amount.trim()) {
      setError("Amount is required");
      return false;
    }
    
    const numAmount = Number(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      setError("Amount must be a positive number");
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      updateMutation.mutate(Number(amount));
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">Loading settings...</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Settings</h1>
            <p className="text-gray-600">Manage your monthly salary and preferences</p>
          </div>

          {/* Salary Settings */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Monthly Salary
              </CardTitle>
              <CardDescription>
                Set your monthly salary to track spending against income
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="salary">Monthly Salary (৳)</Label>
                  <Input
                    id="salary"
                    type="number"
                    step="0.01"
                    placeholder="50000"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className={error ? "border-red-500" : ""}
                  />
                  {error && <p className="text-sm text-red-500">{error}</p>}
                  {!error && salary && (
                    <p className="text-sm text-gray-600">
                      Current: {formatBDT(salary.monthlyAmount)}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={updateMutation.isPending}
                  className="w-full"
                >
                  {updateMutation.isPending ? "Updating..." : "Update Salary"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Current Settings Summary */}
          {salary && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Current Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-gray-600">Monthly Salary</span>
                  <span className="font-semibold text-gray-900">
                    {formatBDT(salary.monthlyAmount)}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-gray-600">Effective From</span>
                  <span className="font-semibold text-gray-900">
                    {new Date(salary.effectiveFrom).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-gray-600">Last Updated</span>
                  <span className="font-semibold text-gray-900">
                    {new Date(salary.updatedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Info Card */}
          <Card className="mt-6 bg-blue-50 border-blue-200">
            <CardContent className="pt-6">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> Your salary is used to calculate spending percentages and
                forecast your financial status. Update it whenever your income changes to keep
                insights accurate.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Settings;
