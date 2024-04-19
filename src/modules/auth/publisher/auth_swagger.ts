export const authPaths = {
    "/v1/auth": {
      "post": {
        "tags": ["Auth"],
        "summary": "Generate token auth",
        "parameters": [],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "properties": {
                  "email": {
                    "type": "string",
                  },
                }
              },
              "examples": {
                "Admin": {
                  "value": {
                    "email": "admin@gmail.com"
                  }
                },
              }
            }
          }
        },
        "responses": {
          "401": {
            "description": "Unauthorized request",
            "content": {
              "application/json": {
                "schema": { $ref: "#/components/schemas/CommonResponse" },
                "example": {
                  "status": "ERROR",
                  "message": "Unauthorized",
                }
              }
            }
          },
        }
      }
    },
  };
  