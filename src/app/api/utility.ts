import connectDB from "@/db/config";
import InvocationLog from "@/db/models/InvocationLog";

interface LogInvocationParams {
  endpoint: string;
  method: string;
  requestBody?: any;
  statusCode: number;
  responseBody?: any;
  errorMessage?: string;
  category?: string;
}

export async function logInvocation({
  endpoint,
  method,
  requestBody = {},
  statusCode,
  responseBody = {},
  errorMessage,
  category,
}: LogInvocationParams) {
  try {
    await connectDB();

    const invocationLog = new InvocationLog({
      endpoint,
      method: method.toUpperCase(),
      requestBody,
      statusCode,
      responseBody,
      errorMessage,
      category,
      timestamp: new Date(),
    });

    await invocationLog.save();
  } catch (logError) {
    console.error("Failed to log invocation:", logError);
  }
}
