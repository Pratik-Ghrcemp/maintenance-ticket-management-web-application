import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const demoPassword = await bcrypt.hash('Password123', 12);

const departments = [
  { name: 'Operations', code: 'OPS' },
  { name: 'Production', code: 'PROD' },
  { name: 'Quality Assurance', code: 'QA' },
  { name: 'Warehouse', code: 'WH' },
  { name: 'Administration', code: 'ADMIN' },
  { name: 'Safety', code: 'SAFE' }
];

const facilities = [
  {
    name: 'Main Plant',
    code: 'PLANT-01',
    address: 'Main production facility',
    areas: ['Ground Floor', 'Assembly Line A', 'Utility Room', 'Packaging Bay']
  },
  {
    name: 'Warehouse Block',
    code: 'WH-01',
    address: 'Central warehouse and dispatch block',
    areas: ['Loading Dock', 'Cold Storage', 'Inventory Aisle 3', 'Forklift Bay']
  },
  {
    name: 'Admin Building',
    code: 'ADM-01',
    address: 'Front office and staff support area',
    areas: ['Reception', 'Conference Room', 'Server Room', 'Cafeteria']
  }
];

const categories = [
  'Electrical',
  'Plumbing',
  'HVAC',
  'Cleaning',
  'Machine Maintenance',
  'IT Support',
  'Safety Equipment',
  'Civil Repair'
];

const technicians = [
  { name: 'Demo Technician Arjun Patil', email: 'arjun.technician@example.com', skill: 'Electrical Maintenance' },
  { name: 'Demo Technician Neha Joshi', email: 'neha.technician@example.com', skill: 'HVAC and Utilities' },
  { name: 'Demo Technician Rohan Deshmukh', email: 'rohan.technician@example.com', skill: 'Machine Maintenance' },
  { name: 'Demo Technician Sneha Kulkarni', email: 'sneha.technician@example.com', skill: 'Plumbing and Civil Repair' },
  { name: 'Demo Technician Vivek Sharma', email: 'vivek.technician@example.com', skill: 'IT Support' }
];

const departmentUsers = [
  { name: 'Demo User Priya Nair', email: 'priya.user@example.com', department: 'Operations' },
  { name: 'Demo User Amit Verma', email: 'amit.user@example.com', department: 'Production' },
  { name: 'Demo User Kavita Rao', email: 'kavita.user@example.com', department: 'Quality Assurance' },
  { name: 'Demo User Sameer Khan', email: 'sameer.user@example.com', department: 'Warehouse' },
  { name: 'Demo User Meera Iyer', email: 'meera.user@example.com', department: 'Administration' },
  { name: 'Demo User Rahul Singh', email: 'rahul.user@example.com', department: 'Safety' },
  { name: 'Demo User Anjali Pawar', email: 'anjali.user@example.com', department: 'Production' },
  { name: 'Demo User Nikhil Gupta', email: 'nikhil.user@example.com', department: 'Warehouse' }
];

const demoTickets = [
  {
    title: 'Assembly line motor vibration is above normal',
    description: 'Line A motor has visible vibration and abnormal noise during peak load. Production team requested preventive inspection before the next shift.',
    priority: 'URGENT',
    status: 'IN_PROGRESS',
    department: 'Production',
    facility: 'Main Plant',
    area: 'Assembly Line A',
    category: 'Machine Maintenance',
    requester: 'amit.user@example.com',
    technician: 'rohan.technician@example.com',
    comments: ['Initial inspection completed. Bearing wear suspected.', 'Spare bearing requested from stores. Machine kept under observation.']
  },
  {
    title: 'Server room AC cooling fluctuation',
    description: 'Server room temperature rises above the recommended range in the afternoon. Cooling needs immediate check to protect IT equipment.',
    priority: 'HIGH',
    status: 'ASSIGNED',
    department: 'Administration',
    facility: 'Admin Building',
    area: 'Server Room',
    category: 'HVAC',
    requester: 'meera.user@example.com',
    technician: 'neha.technician@example.com',
    comments: ['Technician assigned for HVAC inspection.']
  },
  {
    title: 'Loading dock lights repaired successfully',
    description: 'Two lights near the loading dock were flickering and affecting night dispatch visibility.',
    priority: 'MEDIUM',
    status: 'RESOLVED',
    department: 'Warehouse',
    facility: 'Warehouse Block',
    area: 'Loading Dock',
    category: 'Electrical',
    requester: 'sameer.user@example.com',
    technician: 'arjun.technician@example.com',
    comments: ['Loose neutral connection found.', 'Wiring corrected and lights tested successfully.']
  },
  {
    title: 'Cold storage door seal leakage',
    description: 'Cold storage door seal is not closing tightly. Temperature loss observed near the entrance.',
    priority: 'HIGH',
    status: 'IN_PROGRESS',
    department: 'Warehouse',
    facility: 'Warehouse Block',
    area: 'Cold Storage',
    category: 'Civil Repair',
    requester: 'nikhil.user@example.com',
    technician: 'sneha.technician@example.com',
    comments: ['Temporary sealing done.', 'Replacement gasket measurement completed.']
  },
  {
    title: 'Conference room projector not detecting HDMI',
    description: 'Projector is powered on but does not detect laptop HDMI input during meetings.',
    priority: 'LOW',
    status: 'CLOSED',
    department: 'Administration',
    facility: 'Admin Building',
    area: 'Conference Room',
    category: 'IT Support',
    requester: 'meera.user@example.com',
    technician: 'vivek.technician@example.com',
    comments: ['HDMI wall plate was loose.', 'Issue fixed and user confirmed display is working.']
  },
  {
    title: 'Safety shower low water pressure',
    description: 'Emergency safety shower near utility room has low pressure during weekly inspection.',
    priority: 'URGENT',
    status: 'ASSIGNED',
    department: 'Safety',
    facility: 'Main Plant',
    area: 'Utility Room',
    category: 'Safety Equipment',
    requester: 'rahul.user@example.com',
    technician: 'sneha.technician@example.com',
    comments: ['Assigned as high-priority safety compliance task.']
  },
  {
    title: 'Packaging bay floor cleaning completed',
    description: 'Oil marks were reported in the packaging bay after material movement.',
    priority: 'LOW',
    status: 'RESOLVED',
    department: 'Operations',
    facility: 'Main Plant',
    area: 'Packaging Bay',
    category: 'Cleaning',
    requester: 'priya.user@example.com',
    technician: 'sneha.technician@example.com',
    comments: ['Area cleaned with degreaser.', 'Supervisor verified the floor condition.']
  },
  {
    title: 'Inventory aisle rack bolt loosened',
    description: 'Rack support bolt appears loose in inventory aisle 3. Needs inspection before heavy storage continues.',
    priority: 'MEDIUM',
    status: 'PENDING',
    department: 'Warehouse',
    facility: 'Warehouse Block',
    area: 'Inventory Aisle 3',
    category: 'Civil Repair',
    requester: 'sameer.user@example.com',
    technician: null,
    comments: []
  },
  {
    title: 'Reception washroom tap leakage',
    description: 'Continuous tap leakage reported in reception washroom. Water wastage observed.',
    priority: 'MEDIUM',
    status: 'ASSIGNED',
    department: 'Administration',
    facility: 'Admin Building',
    area: 'Reception',
    category: 'Plumbing',
    requester: 'meera.user@example.com',
    technician: 'sneha.technician@example.com',
    comments: ['Technician assigned. Replacement washer may be required.']
  },
  {
    title: 'Forklift bay charging socket overheating',
    description: 'Charging socket surface is heating during forklift battery charging. Use stopped until inspection.',
    priority: 'URGENT',
    status: 'IN_PROGRESS',
    department: 'Safety',
    facility: 'Warehouse Block',
    area: 'Forklift Bay',
    category: 'Electrical',
    requester: 'rahul.user@example.com',
    technician: 'arjun.technician@example.com',
    comments: ['Socket isolated for safety.', 'Load check in progress.']
  },
  {
    title: 'QA lab exhaust fan noise',
    description: 'Exhaust fan near QA testing area makes noise after continuous operation.',
    priority: 'LOW',
    status: 'PENDING',
    department: 'Quality Assurance',
    facility: 'Main Plant',
    area: 'Ground Floor',
    category: 'HVAC',
    requester: 'kavita.user@example.com',
    technician: null,
    comments: []
  },
  {
    title: 'Cafeteria water purifier service completed',
    description: 'Scheduled maintenance for cafeteria water purifier and filter replacement.',
    priority: 'LOW',
    status: 'CLOSED',
    department: 'Operations',
    facility: 'Admin Building',
    area: 'Cafeteria',
    category: 'Plumbing',
    requester: 'priya.user@example.com',
    technician: 'sneha.technician@example.com',
    comments: ['Filters replaced.', 'Water flow and taste checked with cafeteria staff.']
  },
  {
    title: 'Utility room panel labeling missing',
    description: 'Several electrical panel labels are faded. Clear labeling is required for maintenance safety.',
    priority: 'MEDIUM',
    status: 'ASSIGNED',
    department: 'Safety',
    facility: 'Main Plant',
    area: 'Utility Room',
    category: 'Electrical',
    requester: 'rahul.user@example.com',
    technician: 'arjun.technician@example.com',
    comments: ['Label list prepared from panel schedule.']
  },
  {
    title: 'Production workstation network drop',
    description: 'One workstation on Assembly Line A loses network connection intermittently.',
    priority: 'MEDIUM',
    status: 'IN_PROGRESS',
    department: 'Production',
    facility: 'Main Plant',
    area: 'Assembly Line A',
    category: 'IT Support',
    requester: 'anjali.user@example.com',
    technician: 'vivek.technician@example.com',
    comments: ['Cable and switch port check started.']
  },
  {
    title: 'Admin building staircase tile crack',
    description: 'Small crack observed on staircase tile near reception. Needs repair to avoid trip hazard.',
    priority: 'HIGH',
    status: 'PENDING',
    department: 'Administration',
    facility: 'Admin Building',
    area: 'Reception',
    category: 'Civil Repair',
    requester: 'meera.user@example.com',
    technician: null,
    comments: []
  },
  {
    title: 'Packaging machine guard alignment fixed',
    description: 'Safety guard alignment was causing machine interlock warnings.',
    priority: 'HIGH',
    status: 'RESOLVED',
    department: 'Production',
    facility: 'Main Plant',
    area: 'Packaging Bay',
    category: 'Machine Maintenance',
    requester: 'anjali.user@example.com',
    technician: 'rohan.technician@example.com',
    comments: ['Guard bracket adjusted.', 'Machine restarted and interlock status normal.']
  },
  {
    title: 'Warehouse aisle housekeeping issue',
    description: 'Packing waste found blocking movement path in inventory aisle 3.',
    priority: 'LOW',
    status: 'RESOLVED',
    department: 'Warehouse',
    facility: 'Warehouse Block',
    area: 'Inventory Aisle 3',
    category: 'Cleaning',
    requester: 'nikhil.user@example.com',
    technician: 'sneha.technician@example.com',
    comments: ['Waste removed.', 'Aisle marked clear for movement.']
  },
  {
    title: 'Main plant ground floor drain smell',
    description: 'Unpleasant smell reported near ground floor drain. Cleaning and trap inspection required.',
    priority: 'MEDIUM',
    status: 'ASSIGNED',
    department: 'Operations',
    facility: 'Main Plant',
    area: 'Ground Floor',
    category: 'Plumbing',
    requester: 'priya.user@example.com',
    technician: 'sneha.technician@example.com',
    comments: ['Drain cleaning scheduled before second shift.']
  },
  {
    title: 'QA calibration room power backup check',
    description: 'QA team requested UPS backup verification for calibration equipment.',
    priority: 'MEDIUM',
    status: 'CLOSED',
    department: 'Quality Assurance',
    facility: 'Admin Building',
    area: 'Server Room',
    category: 'Electrical',
    requester: 'kavita.user@example.com',
    technician: 'arjun.technician@example.com',
    comments: ['UPS load test completed.', 'Backup duration acceptable for current equipment load.']
  },
  {
    title: 'Dispatch printer queue stuck',
    description: 'Dispatch label printer queue stuck and labels are not printing from warehouse system.',
    priority: 'HIGH',
    status: 'RESOLVED',
    department: 'Warehouse',
    facility: 'Warehouse Block',
    area: 'Loading Dock',
    category: 'IT Support',
    requester: 'sameer.user@example.com',
    technician: 'vivek.technician@example.com',
    comments: ['Printer service restarted.', 'Test labels printed successfully.']
  },
  {
    title: 'Demo login user - utility room light issue',
    description: 'Demo ticket created for the default department user account so beginner testing shows visible ticket activity immediately.',
    priority: 'MEDIUM',
    status: 'ASSIGNED',
    department: 'Operations',
    facility: 'Main Plant',
    area: 'Utility Room',
    category: 'Electrical',
    requester: 'user@example.com',
    technician: 'technician@example.com',
    comments: ['Default technician assigned for demo testing.']
  },
  {
    title: 'Demo login technician - ground floor socket repair',
    description: 'Socket near the ground floor workbench is loose and needs safe inspection. This ticket is assigned to the default technician login.',
    priority: 'HIGH',
    status: 'IN_PROGRESS',
    department: 'Operations',
    facility: 'Main Plant',
    area: 'Ground Floor',
    category: 'Electrical',
    requester: 'user@example.com',
    technician: 'technician@example.com',
    comments: ['Power isolated before inspection.', 'Replacement socket arranged from maintenance store.']
  }
];

const upsertDepartment = async ({ name, code }) =>
  prisma.department.upsert({
    where: { name },
    update: { code },
    create: { name, code }
  });

const upsertFacility = async ({ name, code, address }) =>
  prisma.facility.upsert({
    where: { name },
    update: { code, address },
    create: { name, code, address }
  });

const upsertCategory = async (name) =>
  prisma.category.upsert({
    where: { name },
    update: {},
    create: { name }
  });

const upsertUser = async ({ name, email, role, departmentId }) =>
  prisma.user.upsert({
    where: { email },
    update: { name, role, departmentId, isActive: true },
    create: {
      name,
      email,
      password: demoPassword,
      role,
      departmentId
    }
  });

const createTicketIfMissing = async (ticketSeed, lookups, admin) => {
  const existingTicket = await prisma.ticket.findFirst({
    where: { title: ticketSeed.title }
  });

  if (existingTicket) return null;

  const requester = lookups.users[ticketSeed.requester];
  const technician = ticketSeed.technician ? lookups.users[ticketSeed.technician] : null;

  const ticket = await prisma.ticket.create({
    data: {
      title: ticketSeed.title,
      description: ticketSeed.description,
      priority: ticketSeed.priority,
      facilityId: lookups.facilities[ticketSeed.facility].id,
      areaId: lookups.areas[`${ticketSeed.facility}:${ticketSeed.area}`].id,
      categoryId: lookups.categories[ticketSeed.category].id,
      departmentId: lookups.departments[ticketSeed.department].id,
      createdById: requester.id,
      assignedToId: technician?.id ?? null,
      status: ticketSeed.status
    }
  });

  const auditLogs = [
    {
      ticketId: ticket.id,
      userId: requester.id,
      action: 'TICKET_CREATED',
      newValue: 'PENDING'
    }
  ];

  if (technician) {
    auditLogs.push({
      ticketId: ticket.id,
      userId: admin.id,
      action: 'TECHNICIAN_ASSIGNED',
      oldValue: null,
      newValue: String(technician.id)
    });
  }

  if (!['PENDING', 'ASSIGNED'].includes(ticket.status)) {
    auditLogs.push({
      ticketId: ticket.id,
      userId: technician?.id ?? admin.id,
      action: ticket.status === 'RESOLVED' ? 'TICKET_RESOLVED' : 'STATUS_CHANGED',
      oldValue: technician ? 'ASSIGNED' : 'PENDING',
      newValue: ticket.status
    });
  }

  await prisma.auditLog.createMany({ data: auditLogs });

  if (ticketSeed.comments.length) {
    await prisma.ticketComment.createMany({
      data: ticketSeed.comments.map((comment, index) => ({
        ticketId: ticket.id,
        userId: index % 2 === 0 ? technician?.id ?? admin.id : requester.id,
        comment
      }))
    });
  }

  if (technician) {
    await prisma.notification.create({
      data: {
        userId: technician.id,
        title: 'Demo ticket assigned',
        message: `Demo ticket #${ticket.id} has been assigned for review.`
      }
    });
  }

  return ticket;
};

const main = async () => {
  const departmentLookup = {};
  const facilityLookup = {};
  const areaLookup = {};
  const categoryLookup = {};
  const userLookup = {};

  for (const department of departments) {
    departmentLookup[department.name] = await upsertDepartment(department);
  }

  for (const facilitySeed of facilities) {
    const facility = await upsertFacility(facilitySeed);
    facilityLookup[facility.name] = facility;

    for (const areaName of facilitySeed.areas) {
      areaLookup[`${facility.name}:${areaName}`] = await prisma.area.upsert({
        where: { facilityId_name: { facilityId: facility.id, name: areaName } },
        update: {},
        create: { name: areaName, facilityId: facility.id }
      });
    }
  }

  for (const categoryName of categories) {
    categoryLookup[categoryName] = await upsertCategory(categoryName);
  }

  const admin = await upsertUser({
    name: 'Pratik Shelar Admin',
    email: 'admin@example.com',
    role: 'ADMIN',
    departmentId: departmentLookup.Operations.id
  });
  userLookup[admin.email] = admin;

  for (const technicianSeed of technicians) {
    const user = await upsertUser({
      name: technicianSeed.name,
      email: technicianSeed.email,
      role: 'TECHNICIAN',
      departmentId: departmentLookup.Operations.id
    });
    userLookup[user.email] = user;

    await prisma.technician.upsert({
      where: { userId: user.id },
      update: { skill: technicianSeed.skill, isActive: true },
      create: { userId: user.id, skill: technicianSeed.skill }
    });
  }

  const legacyTechnician = await upsertUser({
    name: 'Technician User',
    email: 'technician@example.com',
    role: 'TECHNICIAN',
    departmentId: departmentLookup.Operations.id
  });
  userLookup[legacyTechnician.email] = legacyTechnician;
  await prisma.technician.upsert({
    where: { userId: legacyTechnician.id },
    update: { skill: 'Electrical Maintenance', isActive: true },
    create: { userId: legacyTechnician.id, skill: 'Electrical Maintenance' }
  });

  for (const userSeed of departmentUsers) {
    const user = await upsertUser({
      name: userSeed.name,
      email: userSeed.email,
      role: 'DEPARTMENT_USER',
      departmentId: departmentLookup[userSeed.department].id
    });
    userLookup[user.email] = user;
  }

  const legacyDepartmentUser = await upsertUser({
    name: 'Department User',
    email: 'user@example.com',
    role: 'DEPARTMENT_USER',
    departmentId: departmentLookup.Operations.id
  });
  userLookup[legacyDepartmentUser.email] = legacyDepartmentUser;

  let createdTickets = 0;
  for (const ticketSeed of demoTickets) {
    const ticket = await createTicketIfMissing(
      ticketSeed,
      {
        departments: departmentLookup,
        facilities: facilityLookup,
        areas: areaLookup,
        categories: categoryLookup,
        users: userLookup
      },
      admin
    );

    if (ticket) createdTickets += 1;
  }

  console.log('Seed completed with rich demo data.');
  console.log(`New demo tickets created: ${createdTickets}`);
  console.log('Admin: admin@example.com / Password123');
  console.log('Technician: technician@example.com / Password123');
  console.log('Department user: user@example.com / Password123');
  console.log('All demo users use password: Password123');
};

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
