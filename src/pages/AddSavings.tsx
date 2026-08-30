import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSavingsPocket } from "@/lib/savings-service";
import { SavingsPocketFormData } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const AddSavings = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState<SavingsPocketFormData>({
    name: "",
    item: "",
    targetAmount: "",
    monthlyContribution: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const createMutation = useMutation({
    mutationFn: createSavingsPocket,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["savings"] });
      toast.success("Savings pocket created");
      navigate("/savings");
    },
    onError: () => {
      toast.error("Failed to create pocket");
    },
  });

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.item.trim()) newErrors.item = "Item description is required";
    
    if (!formData.targetAmount.trim()) {
      newErrors.targetAmount = "Target amount is required";
    } else if (isNaN(Number(formData.targetAmount)) || Number(formData.targetAmount) <= 0) {
      newErrors.targetAmount = "Target must be a positive number";
    }

    if (!formData.monthlyContribution.trim()) {
      newErrors.monthlyContribution = "Monthly contribution is required";
    } else if (isNaN(Number(formData.monthlyContribution)) || Number(formData.monthlyContribution) <= 0) {
      newErrors.monthlyContribution = "Monthly contribution must be a positive number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      createMutation.mutate(formData);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <Link to="/savings">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Savings
              </Button>
            </Link>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Create Savings Pocket</CardTitle>
              <CardDescription>
                Set a savings goal for a specific purchase or milestone
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">Pocket Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="e.g., Wedding, Laptop, Vacation"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={errors.name ? "border-red-500" : ""}
                  />
                  {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                </div>

                {/* Item */}
                <div className="space-y-2">
                  <Label htmlFor="item">Item / Goal Description</Label>
                  <Textarea
                    id="item"
                    placeholder="Describe what you're saving for..."
                    value={formData.item}
                    onChange={(e) => setFormData({ ...formData, item: e.target.value })}
                    className={errors.item ? "border-red-500" : ""}
                    rows={3}
                  />
                  {errors.item && <p className="text-sm text-red-500">{errors.item}</p>}
                </div>

                {/* Target Amount */}
                <div className="space-y-2">
                  <Label htmlFor="targetAmount">Target Amount (৳)</Label>
                  <Input
                    id="targetAmount"
                    type="number"
                    step="0.01"
                    placeholder="300000"
                    value={formData.targetAmount}
                    onChange={(e) => setFormData({ ...formData, targetAmount: e.target.value })}
                    className={errors.targetAmount ? "border-red-500" : ""}
                  />
                  {errors.targetAmount && <p className="text-sm text-red-500">{errors.targetAmount}</p>}
                </div>

                {/* Monthly Contribution */}
                <div className="space-y-2">
                  <Label htmlFor="monthlyContribution">Monthly Contribution (৳)</Label>
                  <Input
                    id="monthlyContribution"
                    type="number"
                    step="0.01"
                    placeholder="20000"
                    value={formData.monthlyContribution}
                    onChange={(e) => setFormData({ ...formData, monthlyContribution: e.target.value })}
                    className={errors.monthlyContribution ? "border-red-500" : ""}
                  />
                  {errors.monthlyContribution && <p className="text-sm text-red-500">{errors.monthlyContribution}</p>}
                  {formData.targetAmount && formData.monthlyContribution && !errors.targetAmount && !errors.monthlyContribution && (
                    <p className="text-sm text-gray-600">
                      Estimated completion: {Math.ceil(Number(formData.targetAmount) / Number(formData.monthlyContribution))} months
                    </p>
                  )}
                </div>

                {/* Info Box */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    <strong>Tip:</strong> We'll show you how your savings compare to a DPS investment
                    at 8% annual interest, helping you make informed financial decisions.
                  </p>
                </div>

                {/* Submit */}
                <div className="flex gap-3">
                  <Button
                    type="submit"
                    className="flex-1"
                    disabled={createMutation.isPending}
                  >
                    {createMutation.isPending ? "Creating..." : "Create Pocket"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/savings")}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AddSavings;
