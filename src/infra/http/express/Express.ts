import express, { Request, Response, NextFunction } from "express";
import HTTPError from "src/errors/ErrorsHTTP";
import Appointments_Router from "src/infra/router/Appointments_Router";
import Customer_Router from "src/infra/router/Customer_Router";
import Employee_Router from "src/infra/router/Employee_Router";
import Service_Router from "src/infra/router/Service_Router";


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/customer", Customer_Router);
app.use("/api/employee", Employee_Router);
app.use("/api/service", Service_Router)
app.use("/api/appointments", Appointments_Router)


app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof HTTPError) {
    console.error(err.statusCode, err.message);
    return res.status(err.statusCode).json({ message: err.message });
  } else {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
