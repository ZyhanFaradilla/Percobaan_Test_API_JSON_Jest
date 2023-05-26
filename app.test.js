const request = require('supertest')
const app = require('./app.js')
const { matchers } = require('jest-json-schema')
expect.extend(matchers);

describe("GET /Company", () => {
    describe("Menampilkan Company", () => {
  
      test("should respond with a 200 status code", async () => {
        const response = await request(app).get("/company")
        expect(response.statusCode).toBe(200)
      })
      test("should specify json in the content type header", async () => {
        const response = await request(app).get("/company")
        expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
      })
    })
    test('Test API JSON Company', async() => {
        const schemacom = {
            properties: {
                name: {
                    type: 'string'
                },
                city: {
                    type:'string'
                },
                address: {
                    type:'string'
                },
                country: {
                    type:'string'
                }
            },required: ['name', 'city', 'address','country']
        }
        const response = await request(app).get('/company')
        expect(response.bodyData).toMatchSchema(schemacom);
    })
})

describe("PUT /company", () => {
        describe("Mengedit Company", () => {
      
          test("should respond with a 200 status code", async () => {
            const response = await request(app).put("/company")
            expect(response.statusCode).toBe(200)
          })
        })
    })
        test('Test API JSON Untuk Edit Company', async() => {
            const schemacom = {
                properties: {
                    name: {
                        type: 'string'
                    },
                    city: {
                        type:'string'
                    },
                    address: {
                        type:'string'
                    },
                    country: {
                        type:'string'
                    }
                },required: ['name', 'city', 'address','country']
            }
            const response = await request(app).put('/company').send({
                name : "NodeFlux",
                city : "Jakarta",
                address : "Jalan Merdeka",
                country : "Indonesia"
                })
            expect(response.bodyData).toMatchSchema(schemacom);
})    

describe("GET /CustomerCount", () => {
    describe("Menampilkan CustomerCount", () => {
  
      test("should respond with a 200 status code", async () => {
        const response = await request(app).get("/customerCount")
        expect(response.statusCode).toBe(200)
      })
       test('Test API JSON CustomerCount', async() => {
        const schemacustcount = {
            properties: {
                customers: {
                    type: "number"
                  }
                },required: [ "customers"]
              }
        const response = await request(app).get('/customerCount')
        expect(response.bodyData).toMatchSchema(schemacustcount);
        })
    })
})

describe.skip("POST /Cutomer", () => {
    describe("Memberi data customer", () => {
    test ('Test dengan API JSON menambahkan customer', async() => {
        const schemacust = {
            properties: {
                id : {
                    type:'string'
                },
                name:{
                    type:'string'
                },
                jobTitle:{
                    type:'string'
                },
                email:{
                    type:'string'
                },
                phone:{
                    type:'string'
                }
            },
            required:['id','name','jobTitle','email','phone']
        }
        const response = await request(app).post('/customer').send({
            id : "b4bb886f-d4e9-476f-a9f8-90c15eef04c3",
            name : "Rika",
            jobTitle: "Mahasiswa",
            email : "rika@gmail.com",
            phone :"0857862561"
        })
        expect(response.bodyData).toMatchSchema(schemacust);
        expect(response.statusCode).toBe(200)
    })
  
  })
})

describe("GET /customerAll", () => {
    describe("Menampilkan Keseluruhan Customer", () => {
  
      test("should respond with a 200 status code", async () => {
        const response = await request(app).get("/customerAll")
        expect(response.statusCode).toBe(200)
      })
      test("should specify json in the content type header", async () => {
        const response = await request(app).get("/customerAll")
        expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
      })
    })
    test('Test API JSON Customer All', async() => {
        const schemacustall = {
            properties: {
                name: {
                    type: 'string'
                },
                city: {
                    type:'string'
                },
                address: {
                    type:'string'
                },
                country: {
                    type:'string'
                }
            },required: ['name', 'city', 'address','country']
        }
        const response = await request(app).get('/customerAll')
        expect(response.bodyData).toMatchSchema(schemacustall);
    })
})

describe.skip("GET PUT DELETE /customer/:id", () => {
    describe("Menampilkan Customer Berdasarkan Id", () => {
  
      test ('Test dengan API JSON sesuai id customer', async() => {
        const schemaid = {
            properties: {
                id : {
                    type:'string'
                },
                name:{
                    type:'string'
                },
                jobTitle:{
                    type:'string'
                },
                email:{
                    type:'string'
                },
                phone:{
                    type:'string'
                }
            },
            required:['id','name','jobTitle','email','phone']
        }
        const response1 = await request(app).get('/customer/0dbf3b7f-f70e-40b0-bb31-fc2c0a5b011d')
        expect(response1.bodyData).toMatchSchema(schemaid);
        expect(response1.statusCode).toBe(200);
    
        const response2 = await request(app).put('/customer/b4bb886f-d4e9-476f-a9f8-90c15eef04c3').send({
            name : "Mika",
            jobTitle : "Mahasiswa",
            email : "mika@gmail.com",
            phone : "08947258886"
        })
        expect(response2.bodyData).toMatchSchema(schemaid);
        expect(response2.statusCode).toBe(200);
    
        const response3 = await request(app).delete('/customer/b4bb886f-d4e9-476f-a9f8-90c15eef04c9')
        expect(response3.bodyData).toMatchSchema(schemaid);
        expect(response3.statusCode).toBe(200);
    })
    })
  
    describe("Ketika id tidak terdaftar", () => {
      test("should respond with a status code of 404", async () => {
        const bodyData = [
          {id: "id"}
        ]
        for (const body of bodyData) {
          const response = await request(app).get("/customer/:id").send(body)
          expect(response.statusCode).toBe(404)
        }
      })
    })
})