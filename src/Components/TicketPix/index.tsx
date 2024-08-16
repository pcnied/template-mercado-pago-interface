import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import React from "react";

const TicketPix = () => {
  const mockBody = {
    transaction_amount: 2000,
    description: "Pagamento de teste v3",
    paymentMethodId: "pix",
    email: "peterson@gmail.com",
    identificationType: "CPF",
    number: "03982616018",
  };
 
  return (
    <Card sx={{ width: 345, maxHeight: 550 }}>
      <CardMedia
        sx={{ height: 280, padding: 3 }}
        image="https://www.compumaq.com.br/loja/img/produtos/0022338.jpg"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Iphone 11
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {mockBody.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Valor: <strong>R$ {mockBody.transaction_amount}</strong>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Método de pagamento: <strong>{mockBody.paymentMethodId}</strong>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          E-mail: <strong>{mockBody.email}</strong>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          CPF: <strong>{mockBody.number}</strong>
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="outlined" size="small">
          COMPRAR VIA PIX
        </Button>
      </CardActions>
    </Card>
  );
};

export default TicketPix;
