# Logistics system

Assignment description:
A company can own one or more warehouses. On each layer there can be one or more products. Each product has a stock balance (ie how many of the product are in stock), a storage location (consisting of a shelf number), a price and a weight.
A company can also have one or more employees and each employee can be linked to several warehouses. Employees can be either pickers or drivers and everyone must be able to have different weekly schedules with different working hours.
Finally, we need to be able to keep track of orders. Each order has a unique order number and consists of a list of products and their number and has a picker connected to it who will pick the order. When the order is packed and ready to be driven out, the order must have a driver attached to it. When the order has been executed, this must also be marked in some way.

Your task is to use Bun, Elysia and mongoose to create an API that can answer as many of the questions below as possible. By "answering the question" is meant that you should be able to enter an endpoint that corresponds to the question and get as accurate data as possible back as JSON. So you only need to deliver JSON and no complete HTML frontend.

Key questions - checklist:
- [x] Which drivers are working today? Who works on Friday?
- [x] Is product X in stock? If it is, in which warehouse (and how many)?
- [ ] Which orders need to be picked right now?
- [ ] What is the oldest order that has been picked but needs to be executed?
- [ ] Which pickers currently have no orders to pick?
- [ ] What is the total cost of all completed orders for the month of October?
- [ ] What was the most expensive order picked in the month of August?

Criteria for E-level:
- [ ] The work is done, but required detailed supervision from start to finish
- [ ] The API can answer some of the questions above

Criteria for C-level:
- [ ] The work is carried out with some supervision, sometimes but not always at a detailed level
- [ ] The API can answer most of the questions above

Criteria for A-level:
- [ ] The work is carried out independently with supervision only in "high-level issues"
- [ ] Database schemas are complex and involve extensive validation
- [ ] Incorrect requests are processed correctly with appropriate error messages
- [ ] The API can answer all the questions above

### What you need
1. Atlas database
2. Bun or Node server running
3. Connect your code with the given URL by atlas, must include a password ..<.password>..