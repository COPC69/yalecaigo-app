import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Clock3,
  CheckCircle2,
  Search,
  Star,
  Power,
  Bike,
  ShieldCheck,
  CreditCard,
  Users,
  Activity,
  CalendarDays,
  ChevronRight,
  CarFront,
  User,
  Wallet,
  BadgeCheck,
} from "lucide-react";

const COLORS = {
  primary: "#0F4C5C",
  accent: "#20C5C6",
  white: "#FFFFFF",
  soft: "#F4F6F8",
  dark: "#1F2937",
};

const initialDrivers = [
  {
    id: 1,
    name: "Jairo Gómez",
    town: "San Pedro",
    eta: 4,
    available: true,
    vehicle: "Motocarro MX-101",
    phone: "3001234567",
    rating: 4.8,
    paid: true,
    zone: "Parque principal",
    todayTrips: 7,
  },
  {
    id: 2,
    name: "Luis Ramírez",
    town: "San Pedro",
    eta: 6,
    available: true,
    vehicle: "Motocarro MX-204",
    phone: "3019876543",
    rating: 4.7,
    paid: true,
    zone: "Hospital",
    todayTrips: 5,
  },
  {
    id: 3,
    name: "Carlos Mejía",
    town: "San Pedro",
    eta: 8,
    available: false,
    vehicle: "Motocarro MX-330",
    phone: "3024567890",
    rating: 4.9,
    paid: false,
    zone: "Mercado",
    todayTrips: 4,
  },
  {
    id: 4,
    name: "Andrés López",
    town: "San Pedro",
    eta: 3,
    available: true,
    vehicle: "Motocarro MX-402",
    phone: "3102345678",
    rating: 4.6,
    paid: true,
    zone: "Colegio",
    todayTrips: 9,
  },
];

const initialRequests = [
  {
    id: 1001,
    userName: "María",
    pickup: "Parque principal",
    driverId: null,
    status: "pending",
    createdAt: "Ahora mismo",
  },
  {
    id: 1002,
    userName: "José",
    pickup: "Hospital",
    driverId: 2,
    status: "accepted",
    createdAt: "Hace 2 min",
  },
];

function Card({ children, className = "", style = {} }) {
  return (
    <div
      className={`rounded-[24px] border border-slate-200 bg-white shadow-sm ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}

function Button({ children, onClick, variant = "primary", className = "", style = {}, type = "button" }) {
  const base = {
    borderRadius: 16,
    padding: "10px 16px",
    fontWeight: 600,
    transition: "all 0.2s ease",
    border: variant === "outline" ? `1px solid ${COLORS.primary}` : "1px solid transparent",
    background: variant === "outline" ? COLORS.white : COLORS.primary,
    color: variant === "outline" ? COLORS.primary : COLORS.white,
    cursor: "pointer",
  };

  return (
    <button type={type} onClick={onClick} className={className} style={{ ...base, ...style }}>
      {children}
    </button>
  );
}

function Input({ value, onChange, placeholder }) {
  return (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none"
    />
  );
}

function Badge({ children, active = false }) {
  return (
    <span
      className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
      style={{
        background: active ? COLORS.accent : COLORS.soft,
        color: active ? COLORS.white : COLORS.dark,
      }}
    >
      {children}
    </span>
  );
}

function SectionTitle({ title, subtitle }) {
  return (
    <div>
      <h2 className="text-xl font-bold" style={{ color: COLORS.dark }}>{title}</h2>
      {subtitle ? <p className="mt-1 text-sm text-slate-500">{subtitle}</p> : null}
    </div>
  );
}

function StatCard({ icon: Icon, label, value, hint }) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-slate-500">{label}</p>
          <p className="mt-2 text-2xl font-bold" style={{ color: COLORS.dark }}>{value}</p>
          {hint ? <p className="mt-1 text-xs text-slate-500">{hint}</p> : null}
        </div>
        <div
          className="rounded-2xl p-3"
          style={{ background: COLORS.soft, color: COLORS.primary }}
        >
          <Icon size={20} />
        </div>
      </div>
    </Card>
  );
}

function Avatar({ name }) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div
      className="flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold"
      style={{ background: COLORS.soft, color: COLORS.primary }}
    >
      {initials}
    </div>
  );
}

function TopBar({ role, setRole, town, setTown }) {
  const roles = [
    { key: "user", label: "Usuario", icon: User },
    { key: "driver", label: "Conductor", icon: Bike },
    { key: "admin", label: "Admin", icon: ShieldCheck },
  ];

  return (
    <div className="sticky top-0 z-20 border-b bg-white/95 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 py-4 md:px-6 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-3xl p-3" style={{ background: COLORS.soft, color: COLORS.primary }}>
              <CarFront size={26} />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold" style={{ color: COLORS.primary }}>Yalecaigo</h1>
              <p className="text-sm" style={{ color: COLORS.dark }}>Te acerca</p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="min-w-[220px]">
              <Input value={town} onChange={(e) => setTown(e.target.value)} placeholder="Municipio" />
            </div>
            <div className="grid grid-cols-3 gap-2 rounded-[22px] border border-slate-200 p-1">
              {roles.map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setRole(key)}
                  className="flex items-center justify-center gap-2 rounded-2xl px-3 py-2 text-sm font-semibold"
                  style={{
                    background: role === key ? COLORS.primary : "transparent",
                    color: role === key ? COLORS.white : COLORS.dark,
                  }}
                >
                  <Icon size={16} />
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function UserView({ drivers, onRequest, activeTrip, setActiveTrip, town }) {
  const [search, setSearch] = useState("");
  const [pickup, setPickup] = useState("Parque principal");
  const [step, setStep] = useState(activeTrip ? "assigned" : "browse");

  const visibleDrivers = useMemo(() => {
    return drivers
      .filter((d) => d.available)
      .filter((d) => d.town.toLowerCase().includes(town.toLowerCase() || ""))
      .filter((d) => [d.name, d.zone, d.vehicle].join(" ").toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => a.eta - b.eta);
  }, [drivers, search, town]);

  const completeTrip = () => {
    setActiveTrip(null);
    setStep("done");
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="space-y-6">
        <Card className="p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-2xl font-bold" style={{ color: COLORS.dark }}>Encuentra un mototaxi en segundos</h2>
              <p className="mt-1 text-sm text-slate-500">
                Busca conductores disponibles en tiempo real y solicita el servicio cuando lo necesites.
              </p>
            </div>
            <Badge active>{visibleDrivers.length} disponibles</Badge>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-[1fr_1fr_auto]">
            <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar conductor o zona" />
            <Input value={pickup} onChange={(e) => setPickup(e.target.value)} placeholder="Punto de recogida" />
            <Button onClick={() => setStep("browse")}>Buscar</Button>
          </div>
        </Card>

        {step === "browse" && (
          <div className="grid gap-4">
            {visibleDrivers.map((driver) => (
              <motion.div key={driver.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                <Card className="p-5">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar name={driver.name} />
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-bold" style={{ color: COLORS.dark }}>{driver.name}</p>
                          <Badge>Disponible</Badge>
                        </div>
                        <p className="text-sm text-slate-500">{driver.vehicle}</p>
                        <div className="mt-1 flex flex-wrap gap-3 text-xs text-slate-500">
                          <span className="inline-flex items-center gap-1"><MapPin size={12} /> {driver.zone}</span>
                          <span className="inline-flex items-center gap-1"><Clock3 size={12} /> {driver.eta} min</span>
                          <span className="inline-flex items-center gap-1"><Star size={12} /> {driver.rating}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button variant="outline" onClick={() => window.alert(`Llama a ${driver.name}: ${driver.phone}`)}>
                        <span className="inline-flex items-center gap-2"><Phone size={16} /> Llamar</span>
                      </Button>
                      <Button
                        onClick={() => {
                          onRequest(driver, pickup);
                          setStep("assigned");
                        }}
                      >
                        Solicitar
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}

            {visibleDrivers.length === 0 && (
              <Card className="p-8 text-center">
                <p className="text-lg font-bold" style={{ color: COLORS.dark }}>No hay conductores visibles en este momento</p>
                <p className="mt-2 text-sm text-slate-500">Prueba otra zona o vuelve en unos minutos.</p>
              </Card>
            )}
          </div>
        )}

        {step === "assigned" && activeTrip && (
          <Card className="p-6">
            <SectionTitle title="Tu conductor va en camino" subtitle="Ya sabes quién te atiende y cuánto tarda en llegar." />
            <div className="mt-5 space-y-5">
              <div className="flex flex-col gap-4 rounded-[24px] border border-slate-200 p-5 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-4">
                  <Avatar name={activeTrip.driver.name} />
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-lg font-bold" style={{ color: COLORS.dark }}>{activeTrip.driver.name}</p>
                      <Badge>Asignado</Badge>
                    </div>
                    <p className="text-sm text-slate-500">{activeTrip.driver.vehicle}</p>
                    <p className="mt-1 text-xs text-slate-500">Recogida en: {activeTrip.pickup}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => window.alert(`Llama a ${activeTrip.driver.phone}`)}>
                    <span className="inline-flex items-center gap-2"><Phone size={16} /> Llamar</span>
                  </Button>
                  <Button onClick={completeTrip}>Finalizar</Button>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <StatCard icon={Clock3} label="Tiempo estimado" value={`${activeTrip.driver.eta} min`} hint="Llegada aproximada" />
                <StatCard icon={MapPin} label="Zona del conductor" value={activeTrip.driver.zone} hint="Última ubicación activa" />
                <StatCard icon={BadgeCheck} label="Calificación" value={activeTrip.driver.rating} hint="Promedio de usuarios" />
              </div>
            </div>
          </Card>
        )}

        {step === "done" && (
          <Card className="p-8 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full" style={{ background: COLORS.soft, color: COLORS.primary }}>
              <CheckCircle2 size={28} />
            </div>
            <h3 className="mt-4 text-xl font-bold" style={{ color: COLORS.dark }}>Servicio finalizado</h3>
            <p className="mt-2 text-sm text-slate-500">Gracias por usar la app. Puedes pedir otro servicio cuando lo necesites.</p>
            <div className="mt-5">
              <Button onClick={() => setStep("browse")}>Pedir otro mototaxi</Button>
            </div>
          </Card>
        )}
      </div>

      <div className="space-y-6">
        <Card className="p-6">
          <SectionTitle title="Cómo funciona" subtitle="Simple, rápido y sin depender de grupos de WhatsApp." />
          <div className="mt-4 space-y-3">
            {[
              "Abres la app cuando necesitas transporte",
              "Ves qué conductores están libres",
              "Solicitas el servicio",
              "Sabes quién te va a atender",
            ].map((item, idx) => (
              <div key={item} className="flex items-center gap-3 rounded-2xl border border-slate-200 p-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full font-bold" style={{ background: COLORS.soft, color: COLORS.primary }}>
                  {idx + 1}
                </div>
                <p className="text-sm" style={{ color: COLORS.dark }}>{item}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <SectionTitle title="Ventajas" />
          <div className="mt-4 space-y-3 text-sm text-slate-500">
            <p>• Encuentras servicio más rápido</p>
            <p>• Ves quién te atiende</p>
            <p>• El conductor gana visibilidad</p>
            <p>• No se fijan precios desde la app</p>
          </div>
        </Card>
      </div>
    </div>
  );
}

function DriverView({ drivers, setDrivers, requests, town }) {
  const currentDriverId = 1;
  const currentDriver = drivers.find((d) => d.id === currentDriverId);
  const [serviceState, setServiceState] = useState("idle");
  const [acceptedRequest, setAcceptedRequest] = useState(null);
  const myPendingRequests = requests.filter((r) => r.status === "pending");

  const toggleAvailability = () => {
    setDrivers((prev) => prev.map((d) => (d.id === currentDriverId ? { ...d, available: !d.available } : d)));
  };

  const acceptRequest = (request) => {
    setAcceptedRequest(request);
    setServiceState("active");
  };

  const finishService = () => {
    setAcceptedRequest(null);
    setServiceState("idle");
    setDrivers((prev) => prev.map((d) => (d.id === currentDriverId ? { ...d, todayTrips: d.todayTrips + 1 } : d)));
  };

  if (!currentDriver) return null;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={Power} label="Estado" value={currentDriver.available ? "Disponible" : "Ocupado"} hint={currentDriver.available ? "Puedes recibir solicitudes" : "No apareces en búsquedas"} />
        <StatCard icon={Wallet} label="Suscripción" value={currentDriver.paid ? "Activa" : "Pendiente"} hint="$30.000 mensuales" />
        <StatCard icon={Activity} label="Servicios hoy" value={currentDriver.todayTrips} hint="Actividad del día" />
        <StatCard icon={MapPin} label="Zona actual" value={currentDriver.zone} hint={town} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <Card className="p-6">
          <SectionTitle title="Panel del conductor" subtitle="Controla tu disponibilidad y atiende solicitudes en tiempo real." />
          <div className="mt-5 space-y-5">
            <div className="flex flex-col gap-4 rounded-[24px] border border-slate-200 p-5 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-lg font-bold" style={{ color: COLORS.dark }}>{currentDriver.name}</p>
                <p className="text-sm text-slate-500">{currentDriver.vehicle}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Badge active={currentDriver.available}>{currentDriver.available ? "Disponible" : "Ocupado"}</Badge>
                <Button onClick={toggleAvailability}>{currentDriver.available ? "Pasar a ocupado" : "Pasar a disponible"}</Button>
              </div>
            </div>

            {serviceState === "idle" && (
              <div className="space-y-4">
                <SectionTitle title="Solicitudes nuevas" subtitle="Estas solicitudes llegan a los conductores que estén disponibles." />
                {myPendingRequests.length > 0 ? (
                  myPendingRequests.map((req) => (
                    <div key={req.id} className="flex flex-col gap-4 rounded-[24px] border border-slate-200 p-4 md:flex-row md:items-center md:justify-between">
                      <div>
                        <p className="font-bold" style={{ color: COLORS.dark }}>{req.userName}</p>
                        <p className="text-sm text-slate-500">Recogida: {req.pickup}</p>
                        <p className="mt-1 text-xs text-slate-500">{req.createdAt}</p>
                      </div>
                      <div className="flex gap-3">
                        <Button variant="outline">Rechazar</Button>
                        <Button onClick={() => acceptRequest(req)}>Aceptar</Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="rounded-[24px] border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500">
                    No hay solicitudes pendientes en este momento.
                  </div>
                )}
              </div>
            )}

            {serviceState === "active" && acceptedRequest && (
              <div className="space-y-4 rounded-[24px] border border-slate-200 p-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-lg font-bold" style={{ color: COLORS.dark }}>Servicio en curso</p>
                    <p className="text-sm text-slate-500">Usuario: {acceptedRequest.userName}</p>
                  </div>
                  <Badge active>Atendiendo</Badge>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-slate-200 p-4">
                    <p className="text-sm text-slate-500">Punto de recogida</p>
                    <p className="mt-1 font-semibold" style={{ color: COLORS.dark }}>{acceptedRequest.pickup}</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 p-4">
                    <p className="text-sm text-slate-500">Contacto</p>
                    <p className="mt-1 font-semibold" style={{ color: COLORS.dark }}>Disponible al aceptar</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button variant="outline"><span className="inline-flex items-center gap-2"><Phone size={16} /> Llamar</span></Button>
                  <Button onClick={finishService}>Finalizar servicio</Button>
                </div>
              </div>
            )}
          </div>
        </Card>

        <div className="space-y-6">
          <Card className="p-6">
            <SectionTitle title="Mi suscripción" subtitle="La app cobra $30.000 al mes para que te encuentren fácil." />
            <div className="mt-4 space-y-4">
              <div className="rounded-[24px] border border-slate-200 p-4">
                <div className="flex items-center justify-between">
                  <p className="font-semibold" style={{ color: COLORS.dark }}>Estado</p>
                  <Badge active={currentDriver.paid}>{currentDriver.paid ? "Activa" : "Pendiente"}</Badge>
                </div>
                <p className="mt-3 text-sm text-slate-500">Próximo cobro: 30 de este mes</p>
              </div>
              <Button className="w-full"><span className="inline-flex items-center gap-2"><CreditCard size={16} /> Pagar suscripción</span></Button>
            </div>
          </Card>

          <Card className="p-6">
            <SectionTitle title="Tu valor en la app" />
            <div className="mt-4 space-y-3 text-sm text-slate-500">
              <p>• Más visibilidad frente a nuevos usuarios</p>
              <p>• Más orden para recibir solicitudes</p>
              <p>• Estado disponible u ocupado en tiempo real</p>
              <p>• Sin depender solo de llamadas o contactos guardados</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function AdminView({ drivers, requests, setDrivers }) {
  const totalDrivers = drivers.length;
  const availableDrivers = drivers.filter((d) => d.available).length;
  const paidDrivers = drivers.filter((d) => d.paid).length;
  const pendingPayments = drivers.filter((d) => !d.paid).length;
  const totalRevenue = paidDrivers * 30000;

  const togglePayment = (driverId) => {
    setDrivers((prev) => prev.map((d) => (d.id === driverId ? { ...d, paid: !d.paid } : d)));
  };

  const toggleStatus = (driverId) => {
    setDrivers((prev) => prev.map((d) => (d.id === driverId ? { ...d, available: !d.available } : d)));
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <StatCard icon={Users} label="Conductores" value={totalDrivers} hint="Total registrados" />
        <StatCard icon={Activity} label="Disponibles" value={availableDrivers} hint="Visibles ahora" />
        <StatCard icon={CreditCard} label="Pagos al día" value={paidDrivers} hint="Suscripciones activas" />
        <StatCard icon={CalendarDays} label="Pagos pendientes" value={pendingPayments} hint="Requieren seguimiento" />
        <StatCard icon={Wallet} label="Ingreso estimado" value={`$${totalRevenue.toLocaleString("es-CO")}`} hint="Mensual" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="p-6">
          <SectionTitle title="Gestión de conductores" subtitle="Activa, suspende y revisa pagos de la red local." />
          <div className="mt-4 space-y-4">
            {drivers.map((driver) => (
              <div key={driver.id} className="flex flex-col gap-4 rounded-[24px] border border-slate-200 p-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-bold" style={{ color: COLORS.dark }}>{driver.name}</p>
                    <Badge active={driver.available}>{driver.available ? "Activo" : "No disponible"}</Badge>
                  </div>
                  <p className="text-sm text-slate-500">{driver.vehicle} • {driver.zone}</p>
                  <p className="mt-1 text-xs text-slate-500">Pago: {driver.paid ? "al día" : "pendiente"}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" onClick={() => toggleStatus(driver.id)}>{driver.available ? "Suspender" : "Activar"}</Button>
                  <Button onClick={() => togglePayment(driver.id)}>{driver.paid ? "Marcar pendiente" : "Marcar pagado"}</Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="space-y-6">
          <Card className="p-6">
            <SectionTitle title="Actividad reciente" />
            <div className="mt-4 space-y-3">
              {requests.map((req) => (
                <div key={req.id} className="rounded-2xl border border-slate-200 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-semibold" style={{ color: COLORS.dark }}>Solicitud #{req.id}</p>
                    <Badge>{req.status}</Badge>
                  </div>
                  <p className="mt-2 text-sm text-slate-500">Usuario: {req.userName}</p>
                  <p className="text-sm text-slate-500">Recogida: {req.pickup}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <SectionTitle title="Próximos pasos" />
            <div className="mt-4 space-y-3 text-sm text-slate-500">
              <p>• Integrar mapa real con geolocalización</p>
              <p>• Conectar base de datos y autenticación</p>
              <p>• Vincular pagos reales de suscripción</p>
              <p>• Añadir notificaciones push</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function YalecaigoPlatform() {
  const [role, setRole] = useState("user");
  const [town, setTown] = useState("San Pedro");
  const [drivers, setDrivers] = useState(initialDrivers);
  const [requests, setRequests] = useState(initialRequests);
  const [activeTrip, setActiveTrip] = useState(null);

  const createRequest = (driver, pickup) => {
    const newRequest = {
      id: Date.now(),
      userName: "Usuario actual",
      pickup,
      driverId: driver.id,
      status: "accepted",
      createdAt: "Ahora mismo",
    };
    setRequests((prev) => [newRequest, ...prev]);
    setActiveTrip({ driver, pickup });
  };

  return (
    <div className="min-h-screen" style={{ background: COLORS.soft, color: COLORS.dark }}>
      <TopBar role={role} setRole={setRole} town={town} setTown={setTown} />

      <main className="mx-auto max-w-7xl px-4 py-6 md:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
          {role === "user" && (
            <UserView
              drivers={drivers}
              onRequest={createRequest}
              activeTrip={activeTrip}
              setActiveTrip={setActiveTrip}
              town={town}
            />
          )}
          {role === "driver" && (
            <DriverView drivers={drivers} setDrivers={setDrivers} requests={requests} town={town} />
          )}
          {role === "admin" && <AdminView drivers={drivers} requests={requests} setDrivers={setDrivers} />}
        </motion.div>
      </main>

      <footer className="border-t bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-sm text-slate-500 md:flex-row md:items-center md:justify-between md:px-6 lg:px-8">
          <p>Yalecaigo • Te acerca</p>
          <div className="flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center gap-1"><CalendarDays size={16} /> Suscripción: $30.000 / mes</span>
            <span className="inline-flex items-center gap-1"><ChevronRight size={16} /> Yalecaigo conecta, no fija precios</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
