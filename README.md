# Redi BE Test

## Demo
- Service: http://ec2-3-1-103-76.ap-southeast-1.compute.amazonaws.com
- API Docs: http://ec2-3-1-103-76.ap-southeast-1.compute.amazonaws.com/api-docs
- Test Result: http://ec2-3-1-103-76.ap-southeast-1.compute.amazonaws.com/test-reports

## Cache Strategy Diagram [🔗](https://swimlanes.io/u/3XCpW2sKn)
![Cache strategy diagram](https://static.swimlanes.io/78af101b8401ad31d6b588fd89e0db26.png)
## Getting Started

### Using Docker
1. Clone this repo.
2. Configure environment variables.
   - Create `.env` file from `.env.example`.
3. Run `docker-compose up -d`
4. Service will running at http://localhost:8080
5. Api docs will running at http://localhost:8080/api-docs
6. Test result will running at http://localhost:8080/test-reports

### Manual
1. Clone this repo.
2. Configure environment variables.
   - Create `.env` file from `.env.example`.
3. Run `npm install` to install dependencies.
4. Run `npm run migrate` to create indexes MongoDB.
5. Run `npm run test` to execute unit test.
6. Run `npm run start:dev` or run `npm run start` to running service.
7. Service will running at http://localhost:8080
8. Api docs will running at http://localhost:8080/api-docs
9. Test result will running at http://localhost:8080/test-reports


## Scripts

- `npm run start:dev` - Run development mode
- `npm run build` - Build the application for production
- `npm run start` - Run production mode (require `yarn build` first)
- `npm run migrate` - Check & Create indexes MongoDB.
- `npm run test` - Run unit test.


## File Structure

```raw
.
├── 📂 swagger/                   
├── 📂 src/
│   ├── 📂 migrations/             
│   ├── 📂 modules/             
│   ├── 📂 utils/         
│   └── middleware.ts               
├── .dockerignore              
├── .env.example          
├── .gitignore                 
├── docker-compose.yml
├── Dockerfile               
├── index.ts
├── jest.config.ts
└── tsconfig.json     
```