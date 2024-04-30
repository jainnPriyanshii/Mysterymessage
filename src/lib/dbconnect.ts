import { promises } from "dns"; 
import mongoose from "mongoose";


type Connectionobject = {
    isConnected?:number
}

const connection : Connectionobject = {}

async function dbconnect(): Promise<void>{
    if(connection.isConnected) {
        console.log("We are connected to database");
        return
    }

    try{
     const db =   await mongoose.connect(process.env.MONGODB_URI || '',{})
    
      connection.isConnected = db.connections[0].readyState
      console.log(db.connection)
      console.log(db)
      console.log("Connection Established Successfully")


    } catch (error){
           
        console.log("Connection Failed",error)
        process.exit(1)
    }

}

export default dbconnect;