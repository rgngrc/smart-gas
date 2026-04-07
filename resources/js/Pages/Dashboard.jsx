import { Head, useForm, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

// ── Styles ────────────────────────────────────────────────────────────────────
const S = {
    wrap: {
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1a1040 0%, #2d1b6e 40%, #4a1a8a 70%, #6b2fa0 100%)',
        padding: '2rem',
        fontFamily: "'Inter', sans-serif",
    },
    topbar: {
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: '2rem',
    },
    logoWrap: { display: 'flex', alignItems: 'center', gap: '12px' },
    logoIcon: {
        width: '42px', height: '42px', borderRadius: '12px',
        background: 'linear-gradient(135deg, #a78bfa, #7c3aed)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontWeight: '800', fontSize: '14px', color: '#fff', letterSpacing: '-0.5px',
    },
    logoTitle: { fontSize: '20px', fontWeight: '800', color: '#fff', letterSpacing: '-0.3px' },
    logoSub: { fontSize: '12px', color: 'rgba(255,255,255,0.45)', marginTop: '2px' },
    avatar: {
        width: '38px', height: '38px', borderRadius: '50%',
        background: 'linear-gradient(135deg, #f472b6, #a78bfa)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontWeight: '700', fontSize: '13px', color: '#fff',
    },
    metrics: {
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '14px', marginBottom: '20px',
    },
    metricCard: {
        background: 'rgba(255,255,255,0.07)',
        border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: '16px', padding: '20px',
    },
    metricIcon: {
        width: '36px', height: '36px', borderRadius: '10px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: '14px',
    },
    metricLabel: {
        fontSize: '11px', color: 'rgba(255,255,255,0.45)',
        textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px',
    },
    metricVal: { fontSize: '28px', fontWeight: '800', color: '#fff', letterSpacing: '-0.5px' },
    metricSub: { fontSize: '11px', marginTop: '4px' },
    grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' },
    card: {
        background: 'rgba(255,255,255,0.07)',
        border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: '16px', padding: '22px',
    },
    cardTitle: {
        fontSize: '13px', fontWeight: '700', color: 'rgba(255,255,255,0.9)',
        marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px',
        textTransform: 'uppercase', letterSpacing: '0.06em',
    },
    dot: { width: '8px', height: '8px', borderRadius: '50%' },
    formLabel: {
        fontSize: '11px', color: 'rgba(255,255,255,0.4)',
        textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '6px',
        display: 'block',
    },
    input: {
        width: '100%', background: 'rgba(255,255,255,0.08)',
        border: '1px solid rgba(255,255,255,0.15)', borderRadius: '10px',
        padding: '10px 13px', fontSize: '13px', color: '#fff',
        marginBottom: '12px', outline: 'none',
    },
    btnPrimary: {
        width: '100%', padding: '12px',
        background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
        border: 'none', borderRadius: '10px',
        fontSize: '13px', fontWeight: '700', color: '#fff',
        cursor: 'pointer', letterSpacing: '0.04em',
        marginTop: '4px', transition: 'opacity 0.2s',
    },
    tableHeader: {
        display: 'grid', gridTemplateColumns: '1fr 90px 80px 60px',
        gap: '8px', fontSize: '10px',
        color: 'rgba(255,255,255,0.3)',
        textTransform: 'uppercase', letterSpacing: '0.07em',
        paddingBottom: '10px',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        marginBottom: '4px',
    },
    tableRow: {
        display: 'grid', gridTemplateColumns: '1fr 90px 80px 60px',
        gap: '8px', alignItems: 'center',
        padding: '10px 0',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        fontSize: '13px',
    },
    divider: { height: '1px', background: 'rgba(255,255,255,0.08)', margin: '14px 0' },
    errorTxt: { fontSize: '11px', color: '#f87171', marginTop: '-8px', marginBottom: '8px' },
};

// ── Fuel badge ────────────────────────────────────────────────────────────────
const FUEL_STYLE = {
    Diesel:   { background: 'rgba(99,102,241,0.25)', color: '#a5b4fc' },
    Unleaded: { background: 'rgba(16,185,129,0.2)',  color: '#6ee7b7' },
    Premium:  { background: 'rgba(245,158,11,0.2)',  color: '#fcd34d' },
};

function FuelBadge({ type }) {
    const style = FUEL_STYLE[type] || FUEL_STYLE.Diesel;
    return (
        <span style={{
            ...style,
            fontSize: '10px', fontWeight: '700',
            padding: '3px 10px', borderRadius: '100px',
            display: 'inline-block', letterSpacing: '0.03em',
        }}>
            {type}
        </span>
    );
}

// ── Price display ─────────────────────────────────────────────────────────────
function PriceDisplay({ price }) {
    const val = parseFloat(price);
    const isHigh = val > 90;
    return (
        <span style={{
            color: isHigh ? '#f87171' : '#4ade80',
            fontWeight: '700', fontSize: '14px',
        }}>
            ₱{val.toFixed(2)}
        </span>
    );
}

// ── Metric card ───────────────────────────────────────────────────────────────
function MetricCard({ label, value, sub, iconColor, iconBg }) {
    return (
        <div style={S.metricCard}>
            <div style={{ ...S.metricIcon, background: iconBg }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                     stroke={iconColor} strokeWidth="2.5" strokeLinecap="round">
                    <circle cx="12" cy="12" r="10" />
                </svg>
            </div>
            <div style={S.metricLabel}>{label}</div>
            <div style={S.metricVal}>{value}</div>
            {sub && <div style={{ ...S.metricSub, color: iconColor }}>{sub}</div>}
        </div>
    );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function Dashboard({ auth, entries = [] }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        station_name:    '',
        fuel_type:       'Diesel',
        price_per_liter: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('fuel.store'), { onSuccess: () => reset() });
    };

    const deleteEntry = (id) => {
        if (!confirm('Remove this fuel entry?')) return;
        router.delete(route('fuel.destroy', id));
    };

    const avgPrice = entries.length
        ? (entries.reduce((s, e) => s + parseFloat(e.price_per_liter), 0) / entries.length).toFixed(2)
        : '—';

    const stations = new Set(entries.map(e => e.station_name)).size;

    const formatDate = (d) =>
        new Date(d).toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' });

    const initials = (name) =>
        name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

    return (
        <AuthenticatedLayout user={auth.user} header={<span />}>
            <Head title="SmartGas Dashboard" />

            <div style={S.wrap}>
                {/* ── Topbar ── */}
                <div style={S.topbar}>
                    <div style={S.logoWrap}>
                        <div style={S.logoIcon}>SG</div>
                        <div>
                            <div style={S.logoTitle}>SmartGas</div>
                            <div style={S.logoSub}>Fuel Price Tracker</div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)', fontWeight: '600' }}>
                                {auth.user.name}
                            </div>
                            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)' }}>
                                {auth.user.email}
                            </div>
                        </div>
                        <div style={S.avatar}>{initials(auth.user.name)}</div>
                    </div>
                </div>

                {/* ── Metrics ── */}
                <div style={S.metrics}>
                    <MetricCard
                        label="Total entries"
                        value={entries.length}
                        sub="fuel logs recorded"
                        iconColor="#a78bfa"
                        iconBg="rgba(124,58,237,0.3)"
                    />
                    <MetricCard
                        label="Average price / L"
                        value={entries.length ? `₱${avgPrice}` : '—'}
                        sub="across all stations"
                        iconColor="#6ee7b7"
                        iconBg="rgba(16,185,129,0.2)"
                    />
                    <MetricCard
                        label="Stations logged"
                        value={stations || '—'}
                        sub="unique locations"
                        iconColor="#fcd34d"
                        iconBg="rgba(245,158,11,0.2)"
                    />
                </div>

                {/* ── Main grid ── */}
                <div style={S.grid}>

                    {/* ── Form card ── */}
                    <div style={S.card}>
                        <div style={S.cardTitle}>
                            <div style={{ ...S.dot, background: '#a78bfa' }} />
                            Log new price
                        </div>

                        <form onSubmit={submit}>
                            <label style={S.formLabel}>Station name</label>
                            <input
                                style={S.input}
                                type="text"
                                placeholder="e.g. Petron EDSA North"
                                value={data.station_name}
                                onChange={e => setData('station_name', e.target.value)}
                                required
                            />
                            {errors.station_name && (
                                <p style={S.errorTxt}>{errors.station_name}</p>
                            )}

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                                <div>
                                    <label style={S.formLabel}>Fuel type</label>
                                    <select
                                        style={S.input}
                                        value={data.fuel_type}
                                        onChange={e => setData('fuel_type', e.target.value)}
                                    >
                                        <option value="Diesel">Diesel</option>
                                        <option value="Unleaded">Unleaded</option>
                                        <option value="Premium">Premium</option>
                                    </select>
                                </div>
                                <div>
                                    <label style={S.formLabel}>Price per liter (₱)</label>
                                    <input
                                        style={S.input}
                                        type="number"
                                        step="0.01"
                                        min="0.01"
                                        placeholder="0.00"
                                        value={data.price_per_liter}
                                        onChange={e => setData('price_per_liter', e.target.value)}
                                        required
                                    />
                                    {errors.price_per_liter && (
                                        <p style={S.errorTxt}>{errors.price_per_liter}</p>
                                    )}
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                style={{ ...S.btnPrimary, opacity: processing ? 0.6 : 1 }}
                            >
                                {processing ? 'Logging...' : '+ Log Fuel Price'}
                            </button>
                        </form>

                        <div style={S.divider} />
                        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                            <span style={{ fontSize: '11px', color: '#4ade80', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4ade80', display: 'inline-block' }} />
                                ₱90 and below — affordable
                            </span>
                            <span style={{ fontSize: '11px', color: '#f87171', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f87171', display: 'inline-block' }} />
                                Above ₱90 — expensive
                            </span>
                        </div>
                    </div>

                    {/* ── History card ── */}
                    <div style={S.card}>
                        <div style={S.cardTitle}>
                            <div style={{ ...S.dot, background: '#6ee7b7' }} />
                            Price history
                        </div>

                        {entries.length === 0 ? (
                            <div style={{
                                textAlign: 'center', padding: '3rem 0',
                                color: 'rgba(255,255,255,0.2)', fontSize: '13px',
                            }}>
                                No entries yet.<br />Log your first fuel price.
                            </div>
                        ) : (
                            <>
                                <div style={S.tableHeader}>
                                    <span>Station</span>
                                    <span>Type</span>
                                    <span>Price/L</span>
                                    <span>Action</span>
                                </div>
                                {entries.map((entry) => (
                                    <div key={entry.id} style={S.tableRow}>
                                        <div>
                                            <div style={{ fontWeight: '600', color: 'rgba(255,255,255,0.9)', fontSize: '13px' }}>
                                                {entry.station_name}
                                            </div>
                                            <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', marginTop: '2px' }}>
                                                {formatDate(entry.created_at)}
                                            </div>
                                        </div>
                                        <div><FuelBadge type={entry.fuel_type} /></div>
                                        <div><PriceDisplay price={entry.price_per_liter} /></div>
                                        <div>
                                            <button
                                                onClick={() => deleteEntry(entry.id)}
                                                style={{
                                                    fontSize: '10px', fontWeight: '600',
                                                    color: '#f87171',
                                                    background: 'rgba(248,113,113,0.1)',
                                                    border: '1px solid rgba(248,113,113,0.25)',
                                                    borderRadius: '6px', padding: '4px 10px',
                                                    cursor: 'pointer',
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}