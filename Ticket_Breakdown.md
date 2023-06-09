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

I would create 3 tickets for this ticket as follows:

1- Update Agent and Shift Model / Effort Estimate: 8 hours
Description:
    A new field custom_id needs to be added to the Agent model to be used to store the custom ID associated with each Agent. Also update the Shift model so that it handles properly the new custom_id for each Agent so that it is possible to fetch shifts by the custom_id.
Acceptance Criteria:
    The Agent model has a new field called "custom_id" of type string.
    The "custom_id" field is nullable so that Facilities can leave it blank if they choose.
    The "custom_id" field is unique.
    The "custom_id" field needs to be retrieved in Agent details when calling the API.
    Add a reference field in the Shift model to the Agent model's "custom_id" field.
    Update all shifts to include the custom ID of the assigned Agent if there is a custom_id created.
    Update the function getShiftsByFacility to include the custom_id of the assigned Agent in the returned Shifts.
Implementation Details:
    Add field "custom_id" to the Agent model in the database schema.
    Update all Agent related API endpoints to handle the new "custom_id" field.
    Update the API documentation by adding information about the new "custom_id" field.
    Add a reference field to the Agent model's "custom_id" field in the Shift model.
    Write a data migration script to update existing Shifts with the custom ID of the assigned Agent if there is a custom_id.
    Update the getShiftsByFacility function to be able to receive the custom_id as an option.

2- Update Report Generation / Effort Estimate: 2 hours
Description:
    The reports need to be updated so that they are able to use the custom_id created by the Facilities allowing them to replace the usage of the internal database IDs for each Agent.
Acceptance Criteria:
    Use the custom_id instead of the internal database ID of each Agent when possible.
Implementation Details:
    Update the report template to include the custom_id field instead of the database ID for each Agent.

3- User Interface Updates for Facilities / Effort Estimate: 4 hours
Description:
    The UI needs to be updated to allow Facilities to manage custom IDs for each Agent they work with.
    Management includes creating, editing and viewing the custom ID created.
Acceptance Criteria:
    Facilities can create a custom ID for an Agent.
    Facilities can edit the custom ID for an Agent.
    Facilities can view the custom ID for an Agent.
Implementation Details:
    Add a function that generates the unique custom ID.
    Add a button that triggers this function and saves it in the database
    Display the custom ID (if it exists) somewhere in the Agent details part.