
## *Notes for 2023-01-02*

flow of the creating a device is to have an API that simple loads a template into the nodered frame ! 
i can design a template file that will used the same for nodered stuff!  
and after that we can just call flow microservice in order to load the saved flows  so programmatically 
 - [ ]  I gonna expose the device API that will helps us to do that ! the flow microservice will called using RabbitMQ [ ]
 - [ ] Other thing is when the flow is created / Loaded i can track the id of that with RabbitMQ  : SO basically , we send the changes throught RabbitMQ channal
 - [ ] Another thing i need to focus on it is the first handshake of the microservices !

## *Notes for 2023-01-05*  
I need to think how to change the communication between the microservices : 
 -  :white_check_mark: **Gateway** = Create a session that will check if the user still connected or not 
 - [ ]  **Gateway** = Create Tests for Gateway to check the session implmentation and check the effect of that
 - [ ] **RabbitMQ** = Check the exchange pattern for the communication 
 - [ ] **Users** = Create a communication to request device / flow / meetings information using the *user ID* 
 - [ ] **Database** = Change the model to be consistante and independate ( basically will add the *user ID* to the ) 
 - [ ] **Devices** = Create communication with flow microservice that will be like basic communications / define the communication flows   
 ## *Notes for 2023-01-09*
 - [ ]  **meeting** = Finish the meetings microservice and add the database connection to it ! in order to have the consistency of the development practices

