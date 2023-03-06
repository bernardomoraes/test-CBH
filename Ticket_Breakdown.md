# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

### Ticket 1: Add a new column to the Agents table called `custom_id`

- **Acceptance Criteria**
  - The column `custom_id` should be added to the Agents table
  - The column `custom_id` should be nullable
  - The column `custom_id` should be a string
  - The column `custom_id` should be unique
  - The column should be added to the `Agents` model schema
  - Migration created to add the column to the table

- **Time/effort estimate**
  - 1 hour

- **Implementation details**
  - Create a new migration file to add the "custom_id" column to the Agents table.
  - Update the Agent model to include the new "custom_id" field.


### Ticket 2: Update generateReport and getShiftsByFacility functions

  - **Acceptance Criteria**
    - The custom_id is used instead of the internal database id when generating the report.
    - The custom_id is displayed in the report in a prominent position.
    - The custom_id is included in the report metadata for each Shift.
    - Time/effort estimate: 2 hours

- **Time/effort estimate**
  - 2 hour

- **Implementation details**
  - Create a new migration file to add the "custom_id" column to the Agents table.
  - Update the Agent model to include the new "custom_id" field.


### Ticket 3: Update user interface to accept the custom_id

  - **Acceptance Criteria**
    - The user interface should allow the user to enter the custom_id when creating a new Agent.
    - The user interface should allow the user to edit the custom_id when editing an existing Agent.
    - Time/effort estimate: 1 hour

- **Time/effort estimate**
  - 1 hour

- **Implementation details**
  - Update the Agent form to include the new "custom_id" field.
  - Update the Agent form to allow the user to edit the "custom_id" field.


