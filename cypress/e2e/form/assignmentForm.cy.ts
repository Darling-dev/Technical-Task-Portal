/// <reference types="cypress" />

describe("Assignment Submission Flow", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should display validation errors for empty fields", () => {
    cy.get("button[type='submit']").click();
    cy.contains("Please fill in all required fields correctly.").should(
      "exist",
    );
  });

  it("should successfully submit the form and navigate to the thank-you page", () => {
    cy.get("input[name='name']").type("John Doe");
    cy.get("input[name='email']").type("john.doe@example.com");
    cy.get("textarea[name='assignment_description']").type(
      "This is my assignment description.",
    );
    cy.get("input[name='github_repo_url']").type(
      "https://github.com/johndoe/repo",
    );
    cy.get("select[name='candidate_level']").select("Junior");

    cy.intercept(
      "POST",
      "https://tools.qa.public.ale.ai/api/tools/candidates/assignments",
      {
        statusCode: 200,
        body: {
          message: "Assignment submitted successfully.",
        },
      },
    ).as("submitAssignment");

    cy.get("button[type='submit']").click();

    cy.wait("@submitAssignment");

    cy.url().should("include", "/thank-you");
    cy.contains("Thank you for your submission!").should("exist");
    cy.contains("John Doe").should("exist");
    cy.contains("john.doe@example.com").should("exist");
    cy.contains("Junior").should("exist");
  });

  it("should display an error message if the API call fails", () => {
    cy.get("input[name='name']").type("John Doe");
    cy.get("input[name='email']").type("john.doe@example.com");
    cy.get("textarea[name='assignment_description']").type(
      "This is my assignment description.",
    );
    cy.get("input[name='github_repo_url']").type(
      "https://github.com/johndoe/repo",
    );
    cy.get("select[name='candidate_level']").select("Junior");

    cy.intercept(
      "POST",
      "https://tools.qa.public.ale.ai/api/tools/candidates/assignments",
      {
        statusCode: 400,
        body: {
          message: "Validation failed",
          errors: [
            "Name is required.",
            "Email must be a valid email address.",
            "Assignment description must be at least 10 characters.",
          ],
        },
      },
    ).as("submitAssignmentError");

    cy.get("button[type='submit']").click();
    cy.wait("@submitAssignmentError");

    cy.contains("Name is required.").should("exist");
    cy.contains("Email must be a valid email address.").should("exist");
    cy.contains(
      "Assignment description must be at least 10 characters.",
    ).should("exist");
  });

  it("should handle fetching candidate levels correctly", () => {
    cy.intercept(
      "GET",
      "https://tools.qa.public.ale.ai/api/tools/candidates/levels",
      {
        statusCode: 200,
        body: {
          levels: ["Junior", "Mid", "Senior", "Principal"],
        },
      },
    ).as("fetchLevels");

    cy.visit("/");

    cy.wait("@fetchLevels");

    cy.get("select[name='candidate_level']")
      .find("option")
      .should("have.length", 5);
    cy.contains("Junior").should("exist");
    cy.contains("Mid").should("exist");
    cy.contains("Senior").should("exist");
    cy.contains("Principal").should("exist");
  });
});
