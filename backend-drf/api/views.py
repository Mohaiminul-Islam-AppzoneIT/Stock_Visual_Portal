from django.shortcuts import render
from rest_framework.views import APIView
from .serializer import StockPredictionSerializer
from rest_framework import status
from rest_framework.response import Response
import yfinance as yf
import pandas as pd 
import numpy as np 
import matplotlib.pyplot as plt 
from datetime import datetime
from .utils import save_plot
from sklearn.preprocessing import MinMaxScaler
from keras.models import load_model
from sklearn.metrics import mean_squared_error, r2_score
# Create your views here.

class StockPredictionAPIView(APIView):

    def post(self, request):
        serializer = StockPredictionSerializer(data=request.data)
        if serializer.is_valid():
            ticker = serializer.validated_data['ticker']


            # Fetch the data form yfinance 
            now = datetime.now()
            start = datetime(now.year-10, now.month, now.day)
            end = now
            df = yf.download(ticker, start, end)
            if df.empty:
                return Response({"error":"No Data found for the given ticker", 
                                'status':status.HTTP_404_NOT_FOUND})
            df = df.reset_index()
            # Generate Basic Plot 
            plt.switch_backend('AGG')
            plt.figure(figsize=(12, 5))
            plt.plot(df.Close, label="Closing Price")
            plt.title(f'Closing Price of {ticker}')
            plt.xlabel('days')
            plt.ylabel('Close Price')
            plt.legend()
            # Save the plot image
            plot_image_path = f'{ticker}_plot.png'
            plot_img = save_plot(plot_image_path)
            
            # 100 days moving avarage
            ma100 = df.Close.rolling(100).mean()
            plt.switch_backend('AGG')
            plt.figure(figsize=(12, 5))
            plt.plot(df.Close, label="Closing Price")
            plt.plot(ma100, 'r', label='100 DMA')
            plt.title(f'100 Days Moving Average of {ticker}')
            plt.xlabel('days')
            plt.ylabel('Close Price')
            plt.legend()
             # Save the plot image
            plot_image_path = f'{ticker}_100_dma.png'
            plot_100_dma = save_plot(plot_image_path)
            
            # 200 days moving avarage
            ma200 = df.Close.rolling(200).mean()
            plt.switch_backend('AGG')
            plt.figure(figsize=(12, 5))
            plt.plot(df.Close, label="Closing Price")
            plt.plot(ma100, 'r', label='100 DMA')
            plt.plot(ma200, 'g', label='200 DMA')
            plt.title(f'200 Days Moving Average of {ticker}')
            plt.xlabel('days')
            plt.ylabel('Close Price')
            plt.legend()
             # Save the plot image
            plot_image_path = f'{ticker}_200_dma.png'
            plot_200_dma = save_plot(plot_image_path)


            # Splitting the data into Training and Testing
            data_training = pd.DataFrame(df.Close[0:int(len(df)*0.7)])
            data_testing = pd.DataFrame(df.Close[int(len(df)*0.7): int(len(df))])
                        
            # Scaling down the data between 0 and 1
            scaler = MinMaxScaler(feature_range=(0, 1))

            # Load ML Model 
            model = load_model('stock_prediction_model.keras')

            # Preparing Test Data
            past_100_days = data_training.tail(100)
            final_df = pd.concat([past_100_days, data_testing], ignore_index=True)
            input_data = scaler.fit_transform(final_df)
            x_test = []
            y_test = []

            for i in range(100, input_data.shape[0]):
                x_test.append(input_data[i-100: i])
                y_test.append(input_data[i, 0])

            x_test, y_test = np.array(x_test), np.array(y_test)

            # Make prediciton 
            ypredicted = model.predict(x_test)

            # Revert the scaled prices to the orginal price 
            ypredicted = scaler.inverse_transform(ypredicted.reshape(-1, 1)).flatten()
            y_test = scaler.inverse_transform(y_test.reshape(-1, 1)).flatten()

            # plot the final prediction 
            plt.switch_backend('AGG')
            plt.figure(figsize=(12, 5))
            plt.plot(y_test, 'b', label="Orginal Price")
            plt.plot(ypredicted, 'r', label='Predicted View')
            plt.title(f'Final Prediction for {ticker}')
            plt.xlabel('days')
            plt.ylabel('Close Price')
            plt.legend()
             # Save the plot image
            plot_image_path = f'{ticker}_final_prediciton.png'
            plot_prediction = save_plot(plot_image_path)


            # Model Evalution 
            # Mean Squeard Error(MSE)
            mse = mean_squared_error(y_test, ypredicted)

            # root mean squred error (RMSE)
            rmse = np.sqrt(mse)

            # R-Squred 
            r2 = r2_score(y_test, ypredicted)

            return Response({
                'status': 'success' ,
                'plot_img':plot_img,
                'plot_100_dma':plot_100_dma,
                'plot_200_dma':plot_200_dma,
                'plot_prediction':plot_prediction,
                'mse':mse,
                'rmse':rmse,
                'r2':r2
                })
