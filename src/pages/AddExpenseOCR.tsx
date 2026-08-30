import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createExpense } from "@/lib/expense-service";
import { extractReceiptData } from "@/lib/mock-ocr";
import { ExpenseFormData } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import { ArrowLeft, Upload, Loader2, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const CATEGORIES = [
  "Rent",
  "Food",
  "Groceries",
  "Transport",
  "Mobile",
  "Utilities",
  "Entertainment",
  "Education",
  "Health",
  "Other",
];

const AddExpenseOCR = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedData, setExtractedData] = useState<{
    amount: number;
    date: string;
    shop: string;
    confidence: number;
  } | null>(null);

  const [formData, setFormData] = useState<ExpenseFormData>({
    date: new Date("2026-04-18").toISOString().split('T')[0],
    category: "",
    shop: "",
    amount: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const createMutation = useMutation({
    mutationFn: createExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      toast.success("Expense added successfully");
      navigate("/expenses");
    },
    onError: () => {
      toast.error("Failed to add expense");
    },
  });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error("Please select an image file");
        return;
      }

      setSelectedFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProcessImage = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    try {
      const result = await extractReceiptData(selectedFile);
      setExtractedData(result);
      
      // Pre-fill form with extracted data
      setFormData({
        date: result.date,
        category: "", // User must select category
        shop: result.shop,
        amount: result.amount.toString(),
      });

      toast.success(`Receipt processed (${(result.confidence * 100).toFixed(0)}% confidence)`);
    } catch (error) {
      toast.error("Failed to process receipt");
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.shop.trim()) newErrors.shop = "Shop name is required";
    if (!formData.amount.trim()) {
      newErrors.amount = "Amount is required";
    } else if (isNaN(Number(formData.amount)) || Number(formData.amount) <= 0) {
      newErrors.amount = "Amount must be a positive number";
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
    <div className="min-h-screen">
      <Navigation />
      
      <div className="container mx-auto px-4 lg:px-8 pt-24 pb-12">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <Link to="/expenses">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Expenses
              </Button>
            </Link>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Upload Receipt</CardTitle>
              <CardDescription>
                Upload a receipt image and we'll extract the details using AI
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* File Upload */}
              {!extractedData && (
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                    <input
                      type="file"
                      id="receipt-upload"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                    <label htmlFor="receipt-upload" className="cursor-pointer">
                      <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-2">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-sm text-gray-500">
                        PNG, JPG, JPEG up to 10MB
                      </p>
                    </label>
                  </div>

                  {imagePreview && (
                    <div className="space-y-4">
                      <img
                        src={imagePreview}
                        alt="Receipt preview"
                        className="w-full max-h-96 object-contain rounded-lg border"
                      />
                      <Button
                        onClick={handleProcessImage}
                        disabled={isProcessing}
                        className="w-full"
                      >
                        {isProcessing ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Processing with Gemini AI...
                          </>
                        ) : (
                          <>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Process Receipt
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {/* Extracted Data & Form */}
              {extractedData && (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Confidence Indicator */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-sm text-green-800">
                      ✓ Receipt processed with {(extractedData.confidence * 100).toFixed(0)}% confidence.
                      Please review and correct any fields below.
                    </p>
                  </div>

                  {/* Image Preview */}
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Receipt"
                      className="w-full max-h-48 object-contain rounded-lg border"
                    />
                  )}

                  {/* Date */}
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className={errors.date ? "border-red-500" : ""}
                    />
                    {errors.date && <p className="text-sm text-red-500">{errors.date}</p>}
                  </div>

                  {/* Category */}
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({ ...formData, category: value })}
                    >
                      <SelectTrigger className={errors.category ? "border-red-500" : ""}>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {CATEGORIES.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.category && <p className="text-sm text-red-500">{errors.category}</p>}
                  </div>

                  {/* Shop */}
                  <div className="space-y-2">
                    <Label htmlFor="shop">Shop / Merchant</Label>
                    <Input
                      id="shop"
                      type="text"
                      placeholder="e.g., Aarong, KFC, DESCO"
                      value={formData.shop}
                      onChange={(e) => setFormData({ ...formData, shop: e.target.value })}
                      className={errors.shop ? "border-red-500" : ""}
                    />
                    {errors.shop && <p className="text-sm text-red-500">{errors.shop}</p>}
                  </div>

                  {/* Amount */}
                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount (৳)</Label>
                    <Input
                      id="amount"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                      className={errors.amount ? "border-red-500" : ""}
                    />
                    {errors.amount && <p className="text-sm text-red-500">{errors.amount}</p>}
                  </div>

                  {/* Submit */}
                  <div className="flex gap-3">
                    <Button
                      type="submit"
                      className="flex-1"
                      disabled={createMutation.isPending}
                    >
                      {createMutation.isPending ? "Adding..." : "Add Expense"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setExtractedData(null);
                        setImagePreview(null);
                        setSelectedFile(null);
                      }}
                    >
                      Upload New
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AddExpenseOCR;
