export const userManagementPaths = {
    "/v1/users": {
      "get": {
        "tags": ["User"],
        "summary": "Get list of users",
        "parameters": [],
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
      },
      "post": {
        "tags": ["User"],
        "summary": "Create new user",
        "parameters": [],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "properties": {
                  "userName": {
                    "type": "string",
                  },
                  "accountNumber": {
                    "type": "string",
                  },
                  "emailAddress": {
                    "type": "string",
                  },
                  "identityNumber": {
                    "type": "string",
                  }
                }
              },
              "examples": {
                "User - Redi": {
                  "value": {
                    "userName": "Redi",
                    "accountNumber": "09239384938",
                    "emailAddress": "rediramdan@gmail.com",
                    "identityNumber": "56347346733",
                  }
                },
                "User - Ramdan": {
                  "value": {
                    "userName": "Ramdan",
                    "accountNumber": "676347767233",
                    "emailAddress": "ramdanredi@gmail.com",
                    "identityNumber": "44334232333",
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
    "/v1/users/by-account-number/{accountNumber}": {
      "get": {
        "tags": ["User"],
        "summary": "Get user detail by account number",
        "parameters": [
          {
            "name": "accountNumber",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
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
      },
    },
    "/v1/users/by-identity-number/{identityNumber}": {
      "get": {
        "tags": ["User"],
        "summary": "Get user detail by identity number",
        "parameters": [
          {
            "name": "identityNumber",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
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
      },
    },
    "/v1/users/{userId}": {
      "get": {
        "tags": ["User"],
        "summary": "Get user detail by id",
        "parameters": [
          {
            "name": "userId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
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
      },
      "delete": {
        "tags": ["User"],
        "summary": "Delete user by id",
        "parameters": [
          {
            "name": "userId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
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
      },
      "put": {
        "tags": ["User"],
        "summary": "Update user data",
        "parameters": [
          {
            "name": "userId",
            "in": "path",
            "required": true,
            "style": "simple",
            "schema": {
              "type": "string",
            }
          }
        ],
        "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "properties": {
                    "userName": {
                      "type": "string",
                      "required": true,
                    },
                    "accountNumber": {
                      "type": "string",
                      "required": true,
                    },
                    "emailAddress": {
                      "type": "string",
                      "required": true,
                    },
                    "identityNumber": {
                      "type": "string",
                      "required": true,
                    }
                  }
                },
                "examples": {
                  "User - Redi": {
                    "value": {
                      "userName": "Redi",
                      "accountNumber": "09239384938",
                      "emailAddress": "rediramdan@gmail.com",
                      "identityNumber": "56347346733",
                    }
                  },
                  "User - Ramdan": {
                    "value": {
                      "userName": "Ramdan",
                      "accountNumber": "676347767233",
                      "emailAddress": "ramdanredi@gmail.com",
                      "identityNumber": "44334232333",
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
  