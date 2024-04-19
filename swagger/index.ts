import { authPaths } from "../src/modules/auth/publisher/auth_swagger";
import { userManagementPaths } from "../src/modules/user-management/publisher/user_swagger";

export default {
  openapi: "3.0.0",
  info: {
    title: "Redi BE Test Service",
    description: "Redi BE Test Service API endpoints documentation",
    version: "v.0.0.1"
  },
  servers: [
    {
      url: "http://localhost:8080",
      description: "Local server"
    },
    {
      url: "http://ec2-3-1-103-76.ap-southeast-1.compute.amazonaws.com",
      description: "Demo server"
    }
  ],
  security: [
    {
      bearerAuth: []
    }
  ],
  consumes: [
    "application/json"
  ],
  produces: [
    "application/json"
  ],
  components: {
    schemas: {
      CommonResponse: {
        type: "object",
        properties: {
          status: { type: "string" },
          message: { type: "string" },
          data: { type: "object" }
        }
      },
    },
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT"
      }
    }
  },
  paths: {
    ...authPaths,
    ...userManagementPaths,
  }
};
